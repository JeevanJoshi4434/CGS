#calculate_params.py
from collections import defaultdict
import json
from typing import Dict, List, Any
from ques_param import question_mapping  
from student_data import student_data 

def normalize(value, min_val, max_val):
    """Normalize value to a 0–1 scale."""
    if max_val == min_val:
        return 0  # Avoid division by zero
    return (value - min_val) / (max_val - min_val)

def compute_parameters_from_responses(student_data, question_mapping, parameter_ranges=None, normalize_values=False):
    """
    Compute parameter scores from user responses.
    
    Parameters:
        student_data (dict): Question ID → Response (e.g., "verbal_1": "4")
        question_mapping (dict): QUESTION_MAPPING (qid → {parameter, conversion/scale/index})
        parameter_ranges (dict): Optional min-max range for each parameter
        normalize_values (bool): If True, normalizes using the range

    Returns:
        dict: A dictionary where keys are parameter names and values are their computed scores.
    """
    parameter_scores = defaultdict(list)

    for qid, answer in student_data.items():
        if qid not in question_mapping:
            continue

        qmap = question_mapping[qid]
        param = qmap["parameter"]

        # Categorical responses mapped to numerical values
        if "conversion" in qmap:
            value = qmap["conversion"].get(answer, 0)
            parameter_scores[param].append(value)

        # Simple rating scales like 1–5
        elif "scale" in qmap:
            try:
                value = int(answer)
            except ValueError:
                value = 0
            parameter_scores[param].append(value)

        # Composite scores (like 4 items → 1 parameter)
        elif "index" in qmap and "max_score" in qmap:
            try:
                value = int(answer)
                max_score = qmap["max_score"]
                value = (value / max_score) if max_score > 0 else 0
            except ValueError:
                value = 0
            parameter_scores[param].append(value)

    # Sum up each parameter and optionally normalize
    final_params = {}
    for param, values in parameter_scores.items():
        total = sum(values)
        if normalize_values and parameter_ranges:
            # if param not in parameter_ranges:
            #     continue
            min_val, max_val = parameter_ranges[param]
            total = normalize(total, min_val, max_val)
        final_params[param] = total

    return final_params