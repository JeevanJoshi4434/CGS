import json
import base64

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
        raw_data = json.loads(student_json)
        submission_data = raw_data.get("submissionData", {})
        data_chunks = submission_data.get("data", {})

        # Merge "0" to "18" into a single responses dictionary
        responses = {}
        for key in sorted(data_chunks.keys(), key=int):
            responses.update(data_chunks[key])

        # Decode additionalInfo from base64
        encoded_info = submission_data.get("additionalInfo", "")
        decoded_bytes = base64.b64decode(encoded_info)
        decoded_info = json.loads(decoded_bytes.decode("utf-8"))

        # Construct final student object
        student = {
            "name": decoded_info.get("name", "Unknown"),
            "assessment_date": decoded_info.get("DOB", "Unknown"),
            "current_education": decoded_info.get("school", "Unknown"),
            "responses": responses
        }

        students.append(student)

    return students
