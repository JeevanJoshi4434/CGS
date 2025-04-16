#new_data.py
from ques_param import question_mapping
from typing import Dict, List, Any
import copy
from student_data import student_data
from calculate_params import compute_parameters_from_responses

# Create deep copy
new_data = copy.deepcopy(student_data)

for student in new_data:
    try:
        responses = student.get("responses", {})
        final_params = compute_parameters_from_responses(responses, question_mapping, None, True)
        student["responses"] = final_params.copy()
    except Exception as e:
        print(f"Error processing student data for {student.get('name', 'Unknown')}: {e}")


    
