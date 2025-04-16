#score.py
import json
import os
from typing import Dict, List, Any
import matplotlib.pyplot as plt
from new_data import new_data 

class CareerAssessmentSystem:
    def __init__(self, config_file: str = "parameters.json"):
        """Initialize the system by loading configuration from a JSON file."""
        with open(config_file, 'r') as f:
            config = json.load(f)

        # Load parameter ranges
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
                total_weight = 1  # Prevent division by zero

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
                    "contribution": round(contribution * 100, 1)  # Percent for display
                }

            score_percentage = min((score / total_weight) * 100, 100.0)

            career_results.append({
                "career": career,
                "score": round(score_percentage, 1),
                "match_breakdown": breakdown
            })

        return sorted(career_results, key=lambda x: x["score"], reverse=True)

    # def format_key_strength(self, param_name: str) -> str:
    #     """Format the key strength parameter name for display."""
    #     return param_name.replace("_", " ").capitalize()

    def generate_recommendations(self, new_data: Dict[str, Any], top_n: int = 5) -> Dict[str, Any]:
        """Generate career recommendations based on the student's responses."""
        normalized_scores = self.process_student_responses(new_data["responses"])
        recommendations = self.calculate_career_scores(normalized_scores)
        top_careers = []

        for rec in recommendations[:top_n]:
            strengths = sorted(
                rec["match_breakdown"].items(),
                key=lambda x: x[1]["contribution"],
                reverse=True
            )[:3]
            top_careers.append({
                "career": rec["career"],
                "score": rec["score"],
                #"key_strengths": [self.format_key_strength(s[0]) for s in strengths]
            })

        return {
            "student_info": {
                "name": new_data.get("name"),
                "age": new_data.get("age"),
                "current_education": new_data.get("current_education")
            },
            "top_careers": top_careers,
            "assessment_date": new_data.get("assessment_date")
        }

#     def format_key_strength(self, key_strength: str) -> str:
#         """Format the key strength to remove underscores and capitalize words."""
#         return " ".join(word.capitalize() for word in key_strength.split("_"))

#     def save_to_file(self, all_results: List[Dict[str, Any]], filename: str):
#         """Save the results of all students to a JSON file as an array."""
#         with open(filename, 'w') as f:
#             json.dump(all_results, f, indent=2)

# if __name__ == "__main__":
#     system = CareerAssessmentSystem("parameters.json")

#     # List to hold all results for multiple students
#     all_student_results = []

#     # Loop through all students in student_data (assuming this contains multiple student records)
#     for student in new_data:
#         result = system.generate_recommendations(student)
#         all_student_results.append(result)

#     # The results will be saved as an array in this output file
#     output_filename = "career_recommendations.json"

#     system.save_to_file(all_student_results, output_filename)

    def plot_career_scores(self, recommendations: List[Dict[str, Any]], student_name: str) -> str:
        """Generate and save a bar graph of the student's career scores."""
        careers = [rec["career"] for rec in recommendations]
        scores = [rec["score"] for rec in recommendations]

        plt.figure(figsize=(10, 5))
        bars = plt.bar(careers, scores, color='skyblue')
        plt.title(f"Career Score Chart for {student_name}")
        plt.xlabel("Career Fields")
        plt.ylabel("Score (%)")
        plt.ylim(0, 100)

        for bar in bars:
            yval = bar.get_height()
            plt.text(bar.get_x() + bar.get_width()/2, yval + 1, f'{yval:.1f}%', ha='center', fontsize=8)

        output_dir = "career_graphs"
        os.makedirs(output_dir, exist_ok=True)
        filename = os.path.join(output_dir, f"{student_name.replace(' ', '_')}_career_graph.png")
        plt.tight_layout()
        plt.savefig(filename)
        plt.close()

        return filename

# ✅ Main function to return output as dictionary
def get_all_student_results() -> List[Dict[str, Any]]:
    system = CareerAssessmentSystem("parameters.json")
    all_student_results = []

    for student in student_data:
        result = system.generate_recommendations(student, top_n=5)
        image_path = system.plot_career_scores(
            recommendations=system.calculate_career_scores(
                system.process_student_responses(student["responses"])
            ),
            student_name=student["name"]
        )
        result["graph_path"] = image_path
        all_student_results.append(result)

    return all_student_results

