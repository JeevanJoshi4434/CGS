#ques_param.py
question_mapping={
    "overall_grade_avg": {
      "parameter": "overall_grade_avg",
      "conversion": {
        "A+ (90-100%)": 6,
        "A (80-89%)": 5,
        "B (70-79%)": 4,
        "C (60-69%)": 3,
        "D (50-59%)": 2,
        "Below 50%": 1
      },
      "weight": 1
    },
    "math_ability": {
      "parameter": "math_ability",
      "scale": [1, 5],
      "weight": 1
    },
    "physics_ability": {
      "parameter": "physics_ability",
      "scale": [1, 5],
      "weight": 1
    },
    "chemistry_ability": {
      "parameter": "chemistry_ability",
      "scale": [1, 5],
      "weight": 1
    },
    "biology_ability": {
      "parameter": "biology_ability",
      "scale": [1, 5],
      "weight": 1
    },
    "cs_programming_ability": {
      "parameter": "cs_programming_ability",
      "scale": [1, 5],
      "weight": 1
    },
    # Realistic
    "holland_realistic_1": { "parameter": "realistic_score", "index": 0, "max_score": 5, "weight": 1 },
    "holland_realistic_2": { "parameter": "realistic_score", "index": 1, "max_score": 5, "weight": 1 },
    "holland_realistic_3": { "parameter": "realistic_score", "index": 2, "max_score": 5, "weight": 1 },
    "holland_realistic_4": { "parameter": "realistic_score", "index": 3, "max_score": 5, "weight": 1 },
    "holland_realistic_5": { "parameter": "realistic_score", "index": 4, "max_score": 5, "weight": 1 },
    "holland_realistic_6": { "parameter": "realistic_score", "index": 5, "max_score": 5, "weight": 1 },
  
    # Investigative
    "holland_investigative_1": { "parameter": "investigative_score", "index": 0, "max_score": 5, "weight": 1 },
    "holland_investigative_2": { "parameter": "investigative_score", "index": 1, "max_score": 5, "weight": 1 },
    "holland_investigative_3": { "parameter": "investigative_score", "index": 2, "max_score": 5, "weight": 1 },
    "holland_investigative_4": { "parameter": "investigative_score", "index": 3, "max_score": 5, "weight": 1 },
    "holland_investigative_5": { "parameter": "investigative_score", "index": 4, "max_score": 5, "weight": 1 },
    "holland_investigative_6": { "parameter": "investigative_score", "index": 5, "max_score": 5, "weight": 1 },
  
    # Artistic
    "holland_artistic_1": { "parameter": "artistic_score", "index": 0, "max_score": 5, "weight": 1 },
    "holland_artistic_2": { "parameter": "artistic_score", "index": 1, "max_score": 5, "weight": 1 },
    "holland_artistic_3": { "parameter": "artistic_score", "index": 2, "max_score": 5, "weight": 1 },
    "holland_artistic_4": { "parameter": "artistic_score", "index": 3, "max_score": 5, "weight": 1 },
    "holland_artistic_5": { "parameter": "artistic_score", "index": 4, "max_score": 5, "weight": 1 },
    "holland_artistic_6": { "parameter": "artistic_score", "index": 5, "max_score": 5, "weight": 1 },
  
    # Social
    "holland_social_1": { "parameter": "social_score", "index": 0, "max_score": 5, "weight": 1 },
    "holland_social_2": { "parameter": "social_score", "index": 1, "max_score": 5, "weight": 1 },
    "holland_social_3": { "parameter": "social_score", "index": 2, "max_score": 5, "weight": 1 },
    "holland_social_4": { "parameter": "social_score", "index": 3, "max_score": 5, "weight": 1 },
    "holland_social_5": { "parameter": "social_score", "index": 4, "max_score": 5, "weight": 1 },
    "holland_social_6": { "parameter": "social_score", "index": 5, "max_score": 5, "weight": 1 },
  
    # Enterprising
    "holland_enterprising_1": { "parameter": "enterprising_score", "index": 0, "max_score": 5, "weight": 1 },
    "holland_enterprising_2": { "parameter": "enterprising_score", "index": 1, "max_score": 5, "weight": 1 },
    "holland_enterprising_3": { "parameter": "enterprising_score", "index": 2, "max_score": 5, "weight": 1 },
    "holland_enterprising_4": { "parameter": "enterprising_score", "index": 3, "max_score": 5, "weight": 1 },
    "holland_enterprising_5": { "parameter": "enterprising_score", "index": 4, "max_score": 5, "weight": 1 },
    "holland_enterprising_6": { "parameter": "enterprising_score", "index": 5, "max_score": 5, "weight": 1 },
  
    # Conventional
    "holland_conventional_1": { "parameter": "conventional_score", "index": 0, "max_score": 5, "weight": 1 },
    "holland_conventional_2": { "parameter": "conventional_score", "index": 1, "max_score": 5, "weight": 1 },
    "holland_conventional_3": { "parameter": "conventional_score", "index": 2, "max_score": 5, "weight": 1 },
    "holland_conventional_4": { "parameter": "conventional_score", "index": 3, "max_score": 5, "weight": 1 },
    "holland_conventional_5": { "parameter": "conventional_score", "index": 4, "max_score": 5, "weight": 1 },
    "holland_conventional_6": { "parameter": "conventional_score", "index": 5, "max_score": 5, "weight": 1 },

    "math_interest": { "parameter": "math_ability", "scale": [1, 5], "weight": 1 },
    "physics_interest": { "parameter": "physics_ability", "scale": [1, 5], "weight": 1 },
    "chemistry_interest": { "parameter": "chemistry_ability", "scale": [1, 5], "weight": 1 },
    "biology_interest": { "parameter": "biology_ability", "scale": [1, 5], "weight": 1 },
    "cs_programming_interest": { "parameter": "cs_programming_ability", "scale": [1, 5], "weight": 1 },
    "literature_reading_interest": { "parameter": "literature_reading_interest", "scale": [1, 5], "weight": 1 },
    "writing_composition_interest": { "parameter": "writing_composition_interest", "scale": [1, 5], "weight": 1 },
    "history_social_interest": { "parameter": "social_interest", "scale": [1, 5], "weight": 1 },
    "geography_interest": { "parameter": "social_interest", "scale": [1, 5], "weight": 1 },
    "art_design_interest": { "parameter": "art_design_interest", "scale": [1, 5], "weight": 1 },
    "political_science_interest": { "parameter": "social_interest", "scale": [1, 5], "weight": 1 },
    "finance_economics_interest": { "parameter": "social_interest", "scale": [1, 5], "weight": 1 },
    "physical_ed_interest": { "parameter": "physical_ed_interest", "scale": [1, 5], "weight": 1 },
  
    "verbal_1": { "parameter": "verbal_reasoning_score", "index": 0, "max_score": 5, "weight": 1 },
    "verbal_2": { "parameter": "verbal_reasoning_score", "index": 1, "max_score": 5, "weight": 1 },
    "verbal_3": { "parameter": "verbal_reasoning_score", "index": 2, "max_score": 5, "weight": 1 },
    "verbal_4": { "parameter": "verbal_reasoning_score", "index": 3, "max_score": 5, "weight": 1 },
    "numerical_1": { "parameter": "numerical_reasoning_score", "index": 0, "max_score": 5, "weight": 1 },
    "numerical_2": { "parameter": "numerical_reasoning_score", "index": 1, "max_score": 5, "weight": 1 },
    "numerical_3": { "parameter": "numerical_reasoning_score", "index": 2, "max_score": 5, "weight": 1 },
    "numerical_4": { "parameter": "numerical_reasoning_score", "index": 3, "max_score": 5, "weight": 1 },

    "spatial_1": { "parameter": "spatial_reasoning_score", "index": 0, "max_score": 5, "weight": 1 },
    "spatial_2": { "parameter": "spatial_reasoning_score", "index": 1, "max_score": 5, "weight": 1 },
    "spatial_3": { "parameter": "spatial_reasoning_score", "index": 2, "max_score": 5, "weight": 1 },
    "spatial_4": { "parameter": "spatial_reasoning_score", "index": 3, "max_score": 5, "weight": 1 },

    "logical_1": { "parameter": "logical_reasoning_score", "index": 0, "max_score": 5, "weight": 1 },
    "logical_2": { "parameter": "logical_reasoning_score", "index": 1, "max_score": 5, "weight": 1 },
    "logical_3": { "parameter": "logical_reasoning_score", "index": 2, "max_score": 5, "weight": 1 },
    "logical_4": { "parameter": "logical_reasoning_score", "index": 3, "max_score": 5, "weight": 1 },


    "creative_1": { "parameter": "creative_thinking_score", "index": 0, "max_score": 5, "weight": 1 },
    "creative_2": { "parameter": "creative_thinking_score", "index": 1, "max_score": 5, "weight": 1 },
    "creative_3": { "parameter": "creative_thinking_score", "index": 2, "max_score": 5, "weight": 1 },
    "creative_4": { "parameter": "creative_thinking_score", "index": 3, "max_score": 5, "weight": 1 },

    "openness_1": { "parameter": "openness_score", "index": 0, "max_score": 5, "weight": 1 },
    "openness_2": { "parameter": "openness_score", "index": 1, "max_score": 5, "weight": 1 },
    "openness_3": { "parameter": "openness_score", "index": 2, "max_score": 5, "weight": 1 },
    "openness_4": { "parameter": "openness_score", "index": 3, "max_score": 5, "weight": 1 },

    "conscientiousness_1": { "parameter": "conscientiousness_score", "index": 0, "max_score": 5, "weight": 1 },
    "conscientiousness_2": { "parameter": "conscientiousness_score", "index": 1, "max_score": 5, "weight": 1 },
    "conscientiousness_3": { "parameter": "conscientiousness_score", "index": 2, "max_score": 5, "weight": 1 },
    "conscientiousness_4": { "parameter": "conscientiousness_score", "index": 3, "max_score": 5, "weight": 1 },

    "extraversion_1": { "parameter": "extraversion_score", "index": 0, "max_score": 5, "weight": 1 },
    "extraversion_2": { "parameter": "extraversion_score", "index": 1, "max_score": 5, "weight": 1 },
    "extraversion_3": { "parameter": "extraversion_score", "index": 2, "max_score": 5, "weight": 1 },
    "extraversion_4": { "parameter": "extraversion_score", "index": 3, "max_score": 5, "weight": 1 } ,

    "agreeableness_1": { "parameter": "agreeableness_score", "index": 0, "max_score": 5, "weight": 1 },
    "agreeableness_2": { "parameter": "agreeableness_score", "index": 1, "max_score": 5, "weight": 1 },
    "agreeableness_3": { "parameter": "agreeableness_score", "index": 2, "max_score": 5, "weight": 1 },
    "agreeableness_4": { "parameter": "agreeableness_score", "index": 3, "max_score": 5, "weight": 1 },

    "emotional_1": { "parameter": "emotional_stability_score", "index": 0, "max_score": 5, "weight": 1 },
    "emotional_2": { "parameter": "emotional_stability_score", "index": 1, "max_score": 5, "weight": 1 },
    "emotional_3": { "parameter": "emotional_stability_score", "index": 2, "max_score": 5, "weight": 1 },
    "emotional_4": { "parameter": "emotional_stability_score", "index": 3, "max_score": 5, "weight": 1 },

    "learning_1": {
      "parameter": "reading_writing_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "learning_2": {
      "parameter": "visual_learning_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "learning_4": {
      "parameter": "hands_on_learning_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "learning_5": {
      "parameter": "discovery_learning_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "learning_6": {
      "parameter": "structured_learning_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "work_1": {
      "parameter": "independent_work_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "work_2": {
      "parameter": "leadership_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "work_3": {
      "parameter": "structured_task_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "work_4": {
      "parameter": "competitive_activity_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "work_5": {
      "parameter": "fast_paced_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "work_6": {
      "parameter": "detail_oriented_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "work_7": {
      "parameter": "creative_work_preference",
      "scale": [1, 5],
      "weight": 1
    },
    "independence_value": { "parameter": "independence_value", "scale": [1, 5], "weight": 1 },
    "structure_value": { "parameter": "structure_value", "scale": [1, 5], "weight": 1 },
    "team_collaboration_value": { "parameter": "team_collaboration_value", "scale": [1, 5], "weight": 1 },
    "variety_value": { "parameter": "variety_value", "scale": [1, 5], "weight": 1 },
    "physical_activity_value": { "parameter": "physical_activity_value", "scale": [1, 5], "weight": 1 },
    "low_stress_value": { "parameter": "low_stress_value", "scale": [1, 5], "weight": 1 },

    "recognition_value": { "parameter": "recognition_value", "scale": [1, 5], "weight": 1 },
    "advancement_value": { "parameter": "advancement_value", "scale": [1, 5], "weight": 1 },
    "expertise_value": { "parameter": "expertise_value", "scale": [1, 5], "weight": 1 },
    "impact_value": { "parameter": "impact_value", "scale": [1, 5], "weight": 1 },
    "challenge_value": { "parameter": "challenge_value", "scale": [1, 5], "weight": 1 },
    "concrete_tasks_value": { "parameter": "concrete_tasks_value", "scale": [1, 5], "weight": 1 },

    "job_security_value": { "parameter": "job_security_value", "scale": [1, 5], "weight": 1 },
    "income_potential_value": { "parameter": "income_potential_value", "scale": [1, 5], "weight": 1 },
    "work_life_balance_value": { "parameter": "work_life_balance_value", "scale": [1, 5], "weight": 1 },
    "flexibility_value": { "parameter": "flexibility_value", "scale": [1, 5], "weight": 1 },
              
    "creativity_value": { "parameter": "creativity_value", "scale": [1, 5], "weight": 1 },
    "ethical_alignment_value": { "parameter": "ethical_alignment_value", "scale": [1, 5], "weight": 1 },
    "autonomy_value": { "parameter": "autonomy_value", "scale": [1, 5], "weight": 1 },
    "growth_learning_value": { "parameter": "growth_learning_value", "scale": [1, 5], "weight": 1 },
    "personal_interest_value": { "parameter": "personal_interest_value", "scale": [1, 5], "weight": 1 },
    "social_impact_value": { "parameter": "social_impact_value", "scale": [1, 5], "weight": 1 },
    
    "relocation_willingness": {
      "parameter": "relocation_willingness",
      "scale": [1, 5],
      "weight": 1
    },
    "environment_preference": {
      "parameter": "environment_preference",
      "conversion": {
        "Urban": "urban",
        "Suburban": "suburban",
        "Rural": "rural",
        "No preference": "no_preference"
      },
      "weight": 1
    },
} 