from flask import Flask, request, jsonify
import redis
import json
from typing import Dict, Any
from score import CareerAssessmentSystem
from new_data import new_data
import base64
import csv
import io
from flask import send_file
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://yourfrontenddomain.com"
])

# Redis connection
redis_client = redis.Redis(host='localhost', port=10001, decode_responses=True)

# Load assessment system
system = CareerAssessmentSystem("parameters.json")


def convert_redis_data_to_student_data(queue_data):
    """
    Converts Redis queue student data into a format suitable for the CareerAssessmentSystem.
    
    Args:
        queue_data (List[str]): List of JSON strings from Redis queue.

    Returns:
        List[Dict[str, Any]]: List of student dictionaries with flattened responses and metadata.
    """

    students = []

    for student_json in queue_data:
        try:
            student_json = student_json.get("data")

            # If student_json is already a dictionary, skip json.loads
            if isinstance(student_json, dict):
                raw_data = student_json
            else:
                # Load the JSON data if it's a string
                raw_data = json.loads(student_json)

            submission_data = raw_data.get("submissionData", {})
            data_chunks = submission_data.get("data", {})

            # Merge "0" to "18" into a single responses dictionary
            responses = {}
            for key in sorted(data_chunks.keys(), key=int):
                responses.update(data_chunks[key])

            # Flatten any list-type responses to strings
            for key, value in responses.items():
                if isinstance(value, list):
                    if len(value) == 1:
                        responses[key] = value[0]
                    else:
                        responses[key] = ", ".join(map(str, value))

            # Decode additionalInfo from base64 if it's available
            encoded_info = submission_data.get("additionalInfo", "")
            if encoded_info:
                try:
                    decoded_bytes = base64.b64decode(encoded_info)
                    decoded_info = json.loads(decoded_bytes.decode("utf-8"))
                except (base64.binascii.Error, json.JSONDecodeError) as e:
                    print(f"Error decoding additionalInfo: {e}")
                    decoded_info = {}  # Use empty dict on error
            else:
                decoded_info = {}

            # Construct final student object
            student = {
                "name": decoded_info.get("name", "Unknown"),
                "assessment_date": decoded_info.get("DOB", "Unknown"),
                "current_education": decoded_info.get("school", "Unknown"),
                "responses": responses
            }

            students.append(student)
        
        except (json.JSONDecodeError, KeyError) as e:
            print(f"Error processing student data: {e}")
            continue  # Skip this student if there’s an error

    return students



def get_bullmq_jobs(queue_prefix: str):
    """
    Retrieves all jobs from all statuses (waiting, active, completed, failed) in BullMQ.
    
    Args:
        queue_prefix (str): The base prefix for BullMQ queues (e.g., "bull:contest_<id>_queue")
        
    Returns:
        List[Dict[str, Any]]: A list of all jobs and their statuses.
    """
    # Redis keys for BullMQ queues
    wait_key = f"{queue_prefix}:wait"
    active_key = f"{queue_prefix}:active"
    completed_key = f"{queue_prefix}:completed"
    failed_key = f"{queue_prefix}:failed"

    # Fetch job IDs for each state
    job_ids = {
        "waiting": redis_client.lrange(wait_key, 0, -1),
        "active": redis_client.lrange(active_key, 0, -1),
        "completed": redis_client.lrange(completed_key, 0, -1),
        "failed": redis_client.lrange(failed_key, 0, -1)
    }

    # Extract job data from each state
    student_data_list = []
    for state, job_id_list in job_ids.items():
        for job_id in job_id_list:
            job_key = f"{queue_prefix}:{job_id}"
            job_type = redis_client.type(job_key)
           
            # Use HGETALL if it's a hash
            if job_type == 'hash':
                job_raw = redis_client.hgetall(job_key)
            else:
                job_raw = redis_client.get(job_key)

            if job_raw:
                # Check if job_raw is already a dictionary
                if isinstance(job_raw, dict):
                    job_obj = job_raw
                else:
                    job_obj = json.loads(job_raw)

                student_data = {
                    "job_id": job_id,
                    "state": state,
                    "data": job_obj.get("data", {}),
                    "timestamp": job_obj.get("timestamp", "Unknown")
                }
                student_data_list.append(student_data)

    return student_data_list


@app.route('/api/v1/process', methods=['GET'])
def process_queue():
    contest_id = request.args.get('id')
    if not contest_id:
        return jsonify({"error": "Missing contest id"}), 400

    queue_key = f"bull:contest_{contest_id}_queue"
    result_key = f"contest_{contest_id}_result"

    student_data_list = get_bullmq_jobs(queue_key)

    if not student_data_list:
        return jsonify({"error": "No student data found in queue"}), 404

    student_data_list = convert_redis_data_to_student_data(student_data_list)

    processed_results = []
    for student_data in student_data_list:
        result = system.generate_recommendations(student_data, top_n=5)
        processed_responses = system.process_student_responses(student_data["responses"])
        image_path = system.plot_career_scores(
            recommendations=system.calculate_career_scores(processed_responses),
            normalized_scores=processed_responses,
            student_name=student_data["name"]
        )
        result["graph_path"] = image_path
        processed_results.append(result)

    redis_client.set(result_key, json.dumps(processed_results))

    # ---- CSV Creation ----
    output = io.StringIO()
    writer = csv.writer(output)

    # Header
    writer.writerow(["Name", "Current Education", "Assessment Date", "Graph Path", "Career 1", "Score 1", "Career 2", "Score 2", "Career 3", "Score 3", "Career 4", "Score 4", "Career 5", "Score 5"])

    for res in processed_results:
        info = res["student_info"]
        top_careers = res["top_careers"]
        row = [
            info["name"],
            info["current_education"],
            res["assessment_date"],
            res["graph_path"]
        ]

        for career in top_careers[:5]:
            row.extend([career["career"], career["score"]])
        writer.writerow(row)

    output.seek(0)

    return send_file(
        io.BytesIO(output.getvalue().encode()),
        mimetype="text/csv",
        as_attachment=True,
        download_name=f"result_{contest_id}.csv"
    )



@app.route('/getresult', methods=['GET'])
def get_result():
    contest_id = request.args.get('id')
    if not contest_id:
        return jsonify({"error": "Missing contest id"}), 400

    result_key = f"contest_{contest_id}_result"
    data = redis_client.get(result_key)

    if not data:
        return jsonify({"error": "No processed result found for given id"}), 404

    return jsonify(json.loads(data))


if __name__ == '__main__':
    app.run(debug=True)
