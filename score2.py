#score2.py
import json
from typing import Dict, List, Any
from student_data import student_data  # Assuming this contains a list of multiple students


class CareerAssessmentSystem:
    def __init__(self, config_file: str = "parameters.json"):
        """Initialize the system by loading configuration from a JSON file."""
        with open(config_file, 'r') as f:
            config = json.load(f)

        # Load parameter ranges (Normalization ranges for each parameter)
        self.parameter_ranges = {
            param: tuple(range_) for param, range_ in config.get("parameter_ranges", {}).items()
        }

        # Load career fields and their associated weights
        self.career_weights = {
            career["name"]: career["parameters"] 
            for career in config.get("career_fields", [])
        }

    def normalize_response(self, value: float, param_name: str) -> float:
        """Normalize the student's response to a value between 0 and 1 based on parameter range."""
        if param_name not in self.parameter_ranges:
            return 0.0
        min_val, max_val = self.parameter_ranges[param_name]
        return (value - min_val) / (max_val - min_val)

    def process_student_responses(self, responses: Dict[str, Any]) -> Dict[str, float]:
        """Normalize all responses based on the parameter ranges."""
        normalized_scores = {}
        for param, value in responses.items():
            if param in self.parameter_ranges:
                normalized_scores[param] = self.normalize_response(value, param)
            else:
                normalized_scores[param] = value if isinstance(value, (int, float)) else 0.0
        return normalized_scores

    def calculate_career_scores(self, normalized_scores: Dict[str, float]) -> List[Dict[str, Any]]:
        """Calculate career scores by summing weighted contributions of each parameter."""
        career_results = []
        for career, params in self.career_weights.items():
            total_weight = sum(param["weight"] for param in params)
            if total_weight == 0:
                total_weight = 1  # Prevent division by zero if no weights are specified

            score = 0.0
            breakdown = {}

            for param in params:
                param_name = param["parameter"]
                weight = param["weight"]
                value = normalized_scores.get(param_name, 0)
                contribution = value * weight
                score += contribution
                breakdown[param_name] = {
                    "normalized_value": round(value, 3),
                    "contribution": round(contribution * 100, 1)  # Convert to percentage
                }

            score_percentage = min((score / total_weight) * 100, 100.0)

            career_results.append({
                "career": career,
                "score": round(score_percentage, 1), 
                "match_breakdown": breakdown
            })

        return sorted(career_results, key=lambda x: x["score"], reverse=True)

    def generate_recommendations(self, student_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate career recommendations based on the student's responses."""
        normalized_scores = self.process_student_responses(student_data["responses"])
        recommendations = self.calculate_career_scores(normalized_scores)
        top_careers = []
        for rec in recommendations[:3]:
            strengths = sorted(
                rec["match_breakdown"].items(),
                key=lambda x: x[1]["contribution"],
                reverse=True
            )[:3]
            top_careers.append({
                "career": rec["career"],
                "score": rec["score"],
                "key_strengths": [self.format_key_strength(strength[0]) for strength in strengths]
            })
        return {
            "student_info": {
                "name": student_data.get("name"),
                "age": student_data.get("age"),
                "current_education": student_data.get("current_education")
            },
            "top_careers": top_careers,
            "assessment_date": student_data.get("assessment_date")
        }

    def format_key_strength(self, key_strength: str) -> str:
        """Format the key strength to remove underscores and capitalize words."""
        return " ".join(word.capitalize() for word in key_strength.split("_"))

    def save_to_file(self, all_results: List[Dict[str, Any]], filename: str):
        """Save the results of all students to a JSON file as an array."""
        with open(filename, 'w') as f:
            json.dump(all_results, f, indent=2)

if __name__ == "__main__":
    system = CareerAssessmentSystem("parameters.json")

    # List to hold all results for multiple students
    all_student_results = []

    # Loop through all students in student_data (assuming this contains multiple student records)
    for student in student_data:
        result = system.generate_recommendations(student)
        all_student_results.append(result)

    # The results will be saved as an array in this output file
    output_filename = "career_recommendations.json"
    system.save_to_file(all_student_results, output_filename)