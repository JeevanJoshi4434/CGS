#score.py
import json
import os
from typing import Dict, List, Any
import matplotlib.pyplot as plt
from new_data import new_data 

class CareerAssessmentSystem:
    def __init__(self, config_file: str = "parameters.json"):
        """Initialize the system by loading configuration from a JSON file."""
        if not os.path.exists(config_file):
            raise FileNotFoundError(f"Configuration file '{config_file}' not found.")

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

        # ✅ Load parameter category mapping
        self.parameter_categories = config.get("parameter_categories", {})

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

    def format_key_strength(self, key_strength: str) -> str:
        """Format the key strength parameter name for display."""
        return " ".join(word.capitalize() for word in key_strength.split("_"))


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
                "key_strengths": [self.format_key_strength(s[0]) for s in strengths]
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

    def plot_career_scores(self, recommendations: List[Dict[str, Any]], normalized_scores: Dict[str, float], student_name: str, top_n: int = 5) -> str:

        import matplotlib.pyplot as plt
        from matplotlib.backends.backend_pdf import PdfPages
        import numpy as np

        output_dir = "career_graphs"
        os.makedirs(output_dir, exist_ok=True)
        filename = os.path.join(output_dir, f"{student_name.replace(' ', '_')}_career_graph.pdf")

        with PdfPages(filename) as pdf:

            # --- 1. Career Score Bar Chart ---
            careers = [rec["career"] for rec in recommendations]
            scores = [rec["score"] for rec in recommendations]
            plt.figure(figsize=(20, 7))
            bars = plt.bar(careers, scores, color='skyblue')
            plt.title(f"Career Score Chart for {student_name}")
            plt.xlabel("Career Fields")
            plt.ylabel("Score (%)")
            plt.ylim(0, 100)
            for bar in bars:
                yval = bar.get_height()
                plt.text(bar.get_x() + bar.get_width()/2, yval + 1, f'{yval:.1f}%', ha='center', fontsize=8)
            plt.tight_layout()
            pdf.savefig()
            plt.close()

            # --- 2. Radar Chart: Top 6 Parameters ---
            top_params = sorted(normalized_scores.items(), key=lambda x: x[1], reverse=True)[:6]
            labels = [self.format_key_strength(p[0]) for p in top_params]
            values = [p[1] for p in top_params]
            angles = np.linspace(0, 2 * np.pi, len(labels), endpoint=False).tolist()
            values += values[:1]
            angles += angles[:1]
            plt.figure(figsize=(20, 6))
            ax = plt.subplot(111, polar=True)
            ax.plot(angles, values, 'o-', linewidth=2)
            ax.fill(angles, values, alpha=0.25)
            ax.set_thetagrids(np.degrees(angles[:-1]), labels)
            ax.set_title("Top Strengths (Radar Chart)")
            pdf.savefig()
            plt.close()

            # --- 3. Stacked Bar Chart: Top 3 Career Contribution Breakdown ---
            top_3 = recommendations[:3]
            all_params = list({param for c in top_3 for param in c["match_breakdown"]})
            x = np.arange(len(top_3))
            fig, ax = plt.subplots(figsize=(20, 6))
            bottom = np.zeros(len(top_3))
            for param in all_params:
                contributions = [c["match_breakdown"].get(param, {"contribution": 0})["contribution"] for c in top_3]
                ax.bar(x, contributions, label=self.format_key_strength(param), bottom=bottom)
                bottom += contributions
            ax.set_xticks(x)
            ax.set_xticklabels([c["career"] for c in top_3])
            ax.set_ylabel("Contribution (%)")
            ax.set_title("Contribution Breakdown of Top 3 Careers")
            ax.legend(fontsize=12, bbox_to_anchor=(1.05, 1), loc='upper left')
            plt.tight_layout()
            pdf.savefig()
            plt.close()

            # --- 4. Pie Chart: Category-Wise Distribution ---
            category_map = self.parameter_categories if hasattr(self, "parameter_categories") else {}
            category_scores = {}
            for param, value in normalized_scores.items():
                category = category_map.get(param, "Others")
                category_scores[category] = category_scores.get(category, 0) + value
            if category_scores:
                plt.figure(figsize=(20, 6))
                plt.pie(category_scores.values(), labels=category_scores.keys(), autopct='%1.1f%%', startangle=140)
                plt.title("Category-wise Strength Distribution")
                plt.tight_layout()
                pdf.savefig()
                plt.close()

            # --- 5. Table: Career + Score + Key Strengths ---
            table_data = [["Career", "Score", "Top 3 Strengths"]]
            for rec in recommendations[:top_n]:
                strengths = sorted(
                    rec["match_breakdown"].items(),
                    key=lambda x: x[1]["contribution"],
                    reverse=True
                )[:3]
                table_data.append([
                    rec["career"],
                    f"{rec['score']}%",
                    ", ".join(self.format_key_strength(s[0]) for s in strengths)
                ])

            fig, ax = plt.subplots(figsize=(20, 2 + 0.5 * len(table_data)))
            ax.axis('off')
            table = ax.table(cellText=table_data, colLabels=None, cellLoc='left', loc='center')
            table.auto_set_font_size(False)
            table.set_fontsize(10)
            table.scale(1, 1.5)
            plt.title("Career Recommendations Summary", fontsize=14)
            pdf.savefig()
            plt.close()

        return filename


# ✅ Main function to return output as dictionary
def get_all_student_results() -> List[Dict[str, Any]]:
    system = CareerAssessmentSystem("parameters.json")
    all_student_results = []

    for student in new_data:
        # ✅ First process normalized scores
        normalized_scores = system.process_student_responses(student["responses"])

        # ✅ Get the career scores using those normalized scores
        recommendations = system.calculate_career_scores(normalized_scores)

        # ✅ Get formatted results
        result = system.generate_recommendations(student, top_n=5)

        # ✅ Call plot_career_scores with ALL 3 arguments
        image_path = system.plot_career_scores(
            recommendations=recommendations,
            normalized_scores=normalized_scores,
            student_name=student["name"],
            top_n=5
        )

        result["graph_path"] = image_path
        all_student_results.append(result)

    return all_student_results





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