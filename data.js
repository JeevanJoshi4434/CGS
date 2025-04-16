    const careerPathways = {
        "Engineering": {
            "description": "Develop, test, and maintain software applications and systems.",
            "education": ["Computer Science", "Software Engineering", "Information Technology"],
            "skills": ["Programming", "Problem-solving", "Logical thinking"],
            "careers": ["B.Tech","Integrated B.Tech + M.Tech", "M.Tech"],
            "matches": {
                "academic": ["math_ability >= 4", "cs_programming_ability >= 3"],
                "interest": ["investigative_score >= 20", "cs_programming_interest >= 4"],
                "aptitude": ["logical_reasoning_score >= 16", "numerical_reasoning_score >= 15"],
                "personality": ["openness_score >= 15", "conscientiousness_score >= 14"],
                "values": ["innovation_value >= 4", "efficiency_value >= 3"]
            }

        },
        "Education": {
            "description": "Teach and guide students in various subjects and skills.",
            "education": ["Education", "Psychology", "Sociology"],
            "skills": ["Communication", "Patience", "Empathy"],
            "careers": ["B.Ed","Integrated B.A. + B.Ed / B.Sc. + B.Ed ","M.Ed"],
            "matches": {
                "academic": ["social_science_ability >= 4", "writing_composition_ability >= 3"],
                "interest": ["social_score >= 20", "artistic_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 15", "emotional_intelligence_score >= 16"],
                "personality": ["agreeableness_score >= 18", "openness_score >= 17"],
                "values": ["helping_others_value >= 5", "education_value >= 4"]
            }
        },
        "Medicine": {
            "description": "Diagnose, treat, and help prevent diseases and injuries.",
            "education": ["Medicine", "Nursing", "Public Health", "Biology"],
            "skills": ["Patient care", "Medical knowledge", "Communication"],
            "careers": ["MBBS","BDS", "BAMS", "BHMS","BPT"],
            "matches": {
                "academic": ["biology_ability >= 4", "chemistry_ability >= 3"],
                "interest": ["social_score >= 20", "investigative_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 14", "numerical_reasoning_score >= 15"],
                "personality": ["agreeableness_score >= 16", "conscientiousness_score >= 16"],
                "values": ["helping_others_value >= 5", "health_wellness_value >= 4"]
            }
        },
        "Finance": {
            "description": "Plan, direct, and coordinate the operations of an organization.",
            "education": ["Business Administration", "Management", "Economics"],
            "skills": ["Leadership", "Communication", "Decision-making"],
            "careers": ["B.Com","BBA", "MBA"],
            "matches": {
                "academic": ["history_social_ability >= 3", "writing_composition_ability >= 3"],
                "interest": ["enterprising_score >= 20", "social_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 14", "logical_reasoning_score >= 14"],
                "personality": ["extraversion_score >= 16", "conscientiousness_score >= 15"],
                "values": ["leadership_preference >= 4", "recognition_value >= 3"]
            }
        },
        "Agriculture": {
            "description": "Manage and improve agricultural production through technology, research, and sustainable practices.",
            "education": ["Agricultural Science", "Environmental Science", "Biotechnology"],
            "skills": ["Sustainability", "Problem-solving", "Research"],
            "careers": ["B.Tech(Agriculture)","B.Sc.(Agriculture)", "MBA(Agribusiness)"],
            "matches" : {
                "academic": ["biology_ability >= 4", "chemistry_ability >= 3"],
                "interest": ["investigative_score >= 20", "realistic_score >= 18"],
                "aptitude": ["numerical_reasoning_score >= 15", "logical_reasoning_score >= 14"],
                "personality": ["openness_score >= 15", "conscientiousness_score >= 14"],
                "values": ["environmental_value >= 5", "sustainability_value >= 4"]
            }
        },
        "Entrepreneurship": {
            "description": "Develop, launch, and manage new business ventures by identifying opportunities and solving problems innovatively.",
            "education": ["Business Administration", "Marketing", "Finance", "Economics"],
            "skills": ["Innovation", "Risk-taking", "Leadership", "Networking"],
            "careers": ["BBA ","B.Com", "MBA"],
            "matches": {
                "academic": ["business_management_ability >= 3", "writing_composition_ability >= 4"],
                "interest": ["enterprising_score >= 20", "creative_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 14", "logical_reasoning_score >= 14"],
                "personality": ["extraversion_score >= 16", "openness_score >= 15"],
                "values": ["innovation_value >= 5", "influence_value >= 4"]
            }
        },
    
        "Business Administration": {
            "description": "Oversee and manage business operations, ensuring efficiency, strategy, and organizational growth.",
            "education": ["Business Administration", "Management", "Finance", "Economics"],
            "skills": ["Leadership", "Strategic Thinking", "Problem-solving", "Communication"],
            "careers": ["BBA","BMS", "MBA"],
            "matches": {
                "academic": ["business_management_ability >= 3", "writing_composition_ability >= 4"],
                "interest": ["enterprising_score >= 20", "social_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 14", "logical_reasoning_score >= 14"],
                "personality": ["extraversion_score >= 16", "conscientiousness_score >= 15"],
                "values": ["leadership_preference >= 4", "recognition_value >= 3"]
            }
        },
        "Law": {
            "description": "Advocate, interpret, and apply laws to protect rights, resolve disputes, and uphold justice.",
            "education": ["Law", "Political Science", "Criminal Justice"],
            "skills": ["Critical Thinking", "Persuasion", "Research", "Public Speaking"],
            "careers": ["LLB","BA LLB / BBA LLB / B.Com LLB", "LLM"],
            "matches": {
                "academic": ["writing_composition_ability >= 4", "history_social_ability >= 3"],
                "interest": ["investigative_score >= 20", "enterprising_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 15", "logical_reasoning_score >= 14"],
                "personality": ["assertiveness_score >= 16", "conscientiousness_score >= 15"],
                "values": ["justice_fairness_value >= 5", "influence_value >= 4"]
            }
        },
        "IT/Computer Science": {
            "description": "Develop, analyze, and implement software solutions to solve complex technical problems.",
            "education": ["Computer Science", "Information Technology", "Software Engineering"],
            "skills": ["Programming", "Problem-solving", "Logical Thinking", "Cybersecurity"],
            "careers": ["B.Tech CSE","BCA", "M.Tech CSE", "MCA"],
            "matches": {
                "academic": ["cs_programming_ability >= 4", "math_ability >= 3"],
                "interest": ["cs_programming_interest >= 4", "investigative_score >= 20"],
                "aptitude": ["logical_reasoning_score >= 16", "numerical_reasoning_score >= 15"],
                "personality": ["openness_score >= 15", "conscientiousness_score >= 14"],
                "values": ["innovation_value >= 4", "efficiency_value >= 3"]
            }
        },
        "Design": {
            "description": "Create visually appealing, functional, and user-centric designs across various media.",
            "education": ["Graphic Design", "Interior Design", "Industrial Design"],
            "skills": ["Creativity", "Aesthetic Sense", "Problem-solving", "Technical Skills"],
            "careers": ["B.Des ","BFA ", "M.Des", "MFA"],
            "matches": {
                "academic": ["art_design_ability >= 4", "spatial_visual_ability >= 3"],
                "interest": ["artistic_score >= 22", "creative_score >= 20"],
                "aptitude": ["spatial_reasoning_score >= 15", "logical_reasoning_score >= 14"],
                "personality": ["openness_score >= 18", "agreeableness_score >= 15"],
                "values": ["self_expression_value >= 5", "innovation_value >= 4"]
            }
        },
        "Hospitality": {
            "description": "Manage and enhance customer experiences in travel, tourism, and service industries.",
            "education": ["Hospitality Management", "Tourism", "Event Planning"],
            "skills": ["Customer Service", "Communication", "Leadership", "Problem-solving"],
            "careers": ["BHM","MHM ", "MBA(Tourism & Hospitality)"],
            "matches": {
                "academic": ["business_management_ability >= 3", "social_communication_ability >= 4"],
                "interest": ["social_score >= 22", "enterprising_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 14", "emotional_intelligence_score >= 15"],
                "personality": ["extraversion_score >= 18", "agreeableness_score >= 17"],
                "values": ["service_value >= 5", "teamwork_value >= 4"]
            }
        },
        "Journalism": {
            "description": "Research, report, and communicate news and stories to inform and engage audiences.",
            "education": ["Journalism", "Mass Communication", "Media Studies"],
            "skills": ["Writing", "Investigative Research", "Storytelling", "Adaptability"],
            "careers": ["BJMC","BA(Journalism & Media Studies)", "MJMC"],
            "matches": {
                "academic": ["writing_composition_ability >= 4", "history_social_ability >= 3"],
                "interest": ["social_score >= 20", "investigative_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 15", "critical_thinking_score >= 14"],
                "personality": ["openness_score >= 17", "assertiveness_score >= 16"],
                "values": ["truth_seeking_value >= 5", "public_awareness_value >= 4"]
            },
            
        },
        "Psychology": {
            "description": "Study mental processes and behavior to understand and improve individual and societal well-being.",
            "education": ["Psychology", "Counseling", "Social Work"],
            "skills": ["Empathy", "Critical Thinking", "Communication"],
            "careers": ["BA Psychology","B.Sc. Psychology", "MA Psychology"],
            "matches": {
                "academic": ["social_science_ability >= 4", "writing_composition_ability >= 3"],
                "interest": ["social_score >= 20", "investigative_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 15", "emotional_intelligence_score >= 16"],
                "personality": ["agreeableness_score >= 18", "openness_score >= 17"],
                "values": ["helping_others_value >= 5", "understanding_value >= 4"]
            }
        },
        "Marketing": {
            "description": "Promote and sell products or services through strategic planning and execution.",
            "education": ["Marketing", "Business Administration", "Communications"],
            "skills": ["Creativity", "Analytical Thinking", "Communication"],
            "careers": ["BBA","B.Com", "MBA"],
            "matches": {
                "academic": ["business_management_ability >= 3", "writing_composition_ability >= 4"],
                "interest": ["enterprising_score >= 20", "creative_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 14", "logical_reasoning_score >= 14"],
                "personality": ["extraversion_score >= 16", "openness_score >= 15"],
                "values": ["innovation_value >= 5", "influence_value >= 4"]
            }
        },
        "Architecture": {
            "description": "Design and plan buildings and structures, balancing aesthetics, functionality, and safety.",
            "education": ["Architecture", "Civil Engineering", "Interior Design"],
            "skills": ["Creativity", "Technical Skills", "Problem-solving"],
            "careers": ["B.Arch","M.Arch"],
            "matches": {
                "academic": ["art_design_ability >= 4", "math_ability >= 3"],
                "interest": ["artistic_score >= 20", "investigative_score >= 18"],
                "aptitude": ["spatial_reasoning_score >= 15", "logical_reasoning_score >= 14"],
                "personality": ["openness_score >= 18", "conscientiousness_score >= 16"],
                "values": ["self_expression_value >= 5", "innovation_value >= 4"]
            }
        },
        "Pharmacy": {
            "description": "Prepare, dispense, and manage medications and health products.",
            "education": ["Pharmacy", "Pharmaceutical Sciences", "Chemistry"],
            "skills": ["Attention to Detail", "Communication", "Problem-solving"],
            "careers": ["B.Pharm","M.Pharm"],
            "matches": {
                "academic": ["biology_ability >= 4", "chemistry_ability >= 3"],
                "interest": ["social_score >= 20", "investigative_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 14", "numerical_reasoning_score >= 15"],
                "personality": ["agreeableness_score >= 16", "conscientiousness_score >= 16"],
                "values": ["helping_others_value >= 5", "health_wellness_value >= 4"]
            }
        },
        "Nursing": {
            "description": "Provide patient care, support, and education in various healthcare settings.",
            "education": ["Nursing", "Healthcare Administration", "Public Health"],
            "skills": ["Patient Care", "Communication", "Critical Thinking"],
            "careers": ["B.Sc Nursing","GNM"],
            "matches": {
                "academic": ["biology_ability >= 4", "social_science_ability >= 3"],
                "interest": ["social_score >= 20", "investigative_score >= 18"],
                "aptitude": ["verbal_reasoning_score >= 14", "emotional_intelligence_score >= 15"],
                "personality": ["agreeableness_score >= 18", "conscientiousness_score >= 17"],
                "values": ["helping_others_value >= 5", "health_wellness_value >= 4"]
            }
        },
    };
    

    export default careerPathways;