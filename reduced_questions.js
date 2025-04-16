export default [
    {
      title: "Academic Performance",
      subsections: [
        {
          description: "General Academic Standing",
          questions: [
            {
              id: "overall_grade_avg",
              text: "What is your overall grade average?",
              type: "multiple-choice",
              options: ["A+ (90-100%)", "A (80-89%)", "B (70-79%)", "C (60-69%)", "D (50-59%)", "Below 50%"],
              weight: 0.5,
            },
            {
              id: "high_performing_subjects",
              text: "In which subjects do you consistently receive your highest grades? (Select up to three)",
              type: "multiple-choice",
              multiple: true,
              options: [
                "Mathematics", "Physics", "Chemistry", "Biology", "Computer Studies",
                "Literature/Language Arts", "History/Social Studies", "Visual Arts",
                "Performing Arts", "Psychology", "Physical Education",
                "Languages (other than primary language)", "Finance/Economics"
              ]
            },
            {
              id: "low_performing_subjects",
              text: "In which subjects do you consistently receive your lowest grades? (Select up to three)",
              type: "multiple-choice",
              multiple: true,
              options: [
                "Mathematics", "Physics", "Chemistry", "Biology", "Computer Studies",
                "Literature/Language Arts", "History/Social Studies", "Visual Arts",
                "Performing Arts", "Psychology", "Physical Education",
                "Languages (other than primary language)", "Finance/Economics"
              ]
            }
          ]
        },
        {
          description: "Subject-Specific Performance",
          questions: [
            {
              id: "math_ability",
              text: "Rate your ability in Mathematics:",
              type: "rating-scale"
            },
            {
              id: "physics_ability",
              text: "Rate your ability in Physics:",
              type: "rating-scale"
            },
            {
              id: "chemistry_ability",
              text: "Rate your ability in Chemistry:",
              type: "rating-scale"
            },
            {
              id: "biology_ability",
              text: "Rate your ability in Biology:",
              type: "rating-scale"
            },
            {
              id: "cs_programming_ability",
              text: "Rate your ability in Computer Science/Programming:",
              type: "rating-scale"
            },
            {
              id: "literature_reading_ability",
              text: "Rate your ability in Literature/Reading Comprehension:",
              type: "rating-scale"
            },
            {
              id: "writing_composition_ability",
              text: "Rate your ability in Writing/Composition:",
              type: "rating-scale"
            },
            {
              id: "history_social_ability",
              text: "Rate your ability in History/Social Studies:",
              type: "rating-scale"
            },
            {
              id: "geography_ability",
              text: "Rate your ability in Geography:",
              type: "rating-scale"
            },
            {
              id: "political_science_ability",
              text: "Rate your ability in Political Science:",
              type: "rating-scale"
            },
            {
              id: "psychology_ability",
              text: "Rate your ability in Psychology:",
              type: "rating-scale"
            },
            {
              id: "finance_economics_ability",
              text: "Rate your ability in Finance/Economics:",
              type: "rating-scale"
            },
            {
              id: "art_design_ability",
              text: "Rate your ability in Art/Design:",
              type: "rating-scale"
            },
            {
              id: "physical_ed_ability",
              text: "Rate your ability in Physical Education/Sports:",
              type: "rating-scale"
            },
          ]
        }
      ]
    },
    {
      title: "Interest Assessment",
      subsections: [
        {
          description: "Holland Code Assessment",
          questions: [
            // Realistic
            { id: "holland_realistic_1", text: "Building things with your hands", type: "rating-scale", category: "realistic" },
            { id: "holland_realistic_2", text: "Working outdoors", type: "rating-scale", category: "realistic" },
            { id: "holland_realistic_3", text: "Operating machinery or tools", type: "rating-scale", category: "realistic" },
            { id: "holland_realistic_4", text: "Participating in athletic activities", type: "rating-scale", category: "realistic" },
            { id: "holland_realistic_5", text: "Fixing mechanical problems", type: "rating-scale", category: "realistic" },
            { id: "holland_realistic_6", text: "Working with plants or animals", type: "rating-scale", category: "realistic" },
  
            // Investigative
            { id: "holland_investigative_1", text: "Solving complex problems", type: "rating-scale", category: "investigative" },
            { id: "holland_investigative_2", text: "Conducting scientific experiments", type: "rating-scale", category: "investigative" },
            { id: "holland_investigative_3", text: "Analyzing data or information", type: "rating-scale", category: "investigative" },
            { id: "holland_investigative_4", text: "Understanding how things work", type: "rating-scale", category: "investigative" },
            { id: "holland_investigative_5", text: "Researching and learning new concepts", type: "rating-scale", category: "investigative" },
            { id: "holland_investigative_6", text: "Solving puzzles or brain teasers", type: "rating-scale", category: "investigative" },
  
            // Artistic
            { id: "holland_artistic_1", text: "Creating artwork", type: "rating-scale", category: "artistic" },
            { id: "holland_artistic_2", text: "Writing stories, poems, or songs", type: "rating-scale", category: "artistic" },
            { id: "holland_artistic_3", text: "Playing a musical instrument", type: "rating-scale", category: "artistic" },
            { id: "holland_artistic_4", text: "Acting or performing", type: "rating-scale", category: "artistic" },
            { id: "holland_artistic_5", text: "Designing new things", type: "rating-scale", category: "artistic" },
            { id: "holland_artistic_6", text: "Expressing yourself creatively", type: "rating-scale", category: "artistic" },
  
            // Social
            { id: "holland_social_1", text: "Helping others with their problems", type: "rating-scale", category: "social" },
            { id: "holland_social_2", text: "Teaching or explaining concepts to others", type: "rating-scale", category: "social" },
            { id: "holland_social_3", text: "Working with children or elderly", type: "rating-scale", category: "social" },
            { id: "holland_social_4", text: "Volunteering in your community", type: "rating-scale", category: "social" },
            { id: "holland_social_5", text: "Mediating conflicts between others", type: "rating-scale", category: "social" },
            { id: "holland_social_6", text: "Organizing social events or activities", type: "rating-scale", category: "social" },
  
            // Enterprising
            { id: "holland_enterprising_1", text: "Leading a team or group", type: "rating-scale", category: "enterprising" },
            { id: "holland_enterprising_2", text: "Persuading others to adopt your ideas", type: "rating-scale", category: "enterprising" },
            { id: "holland_enterprising_3", text: "Selling products or services", type: "rating-scale", category: "enterprising" },
            { id: "holland_enterprising_4", text: "Starting your own business", type: "rating-scale", category: "enterprising" },
            { id: "holland_enterprising_5", text: "Competing to reach goals", type: "rating-scale", category: "enterprising" },
            { id: "holland_enterprising_6", text: "Making decisions that affect others", type: "rating-scale", category: "enterprising" },
  
            // Conventional
            { id: "holland_conventional_1", text: "Following detailed instructions", type: "rating-scale", category: "conventional" },
            { id: "holland_conventional_2", text: "Organizing information or objects", type: "rating-scale", category: "conventional" },
            { id: "holland_conventional_3", text: "Working with numbers and records", type: "rating-scale", category: "conventional" },
            { id: "holland_conventional_4", text: "Paying attention to details", type: "rating-scale", category: "conventional" },
            { id: "holland_conventional_5", text: "Creating or following schedules", type: "rating-scale", category: "conventional" },
            { id: "holland_conventional_6", text: "Completing tasks in a methodical way", type: "rating-scale", category: "conventional" }
          ]
        },
        {
          description: "Subject Interest",
          questions: [
            { id: "math_interest", text: "Mathematics", type: "rating-scale" },
            { id: "physics_interest", text: "Physics", type: "rating-scale" },
            { id: "chemistry_interest", text: "Chemistry", type: "rating-scale" },
            { id: "biology_interest", text: "Biology", type: "rating-scale" },
            { id: "cs_programming_interest", text: "Computer Science/Programming", type: "rating-scale" },
            { id: "literature_reading_interest", text: "Literature/Reading", type: "rating-scale" },
            { id: "writing_composition_interest", text: "Writing/Composition", type: "rating-scale" },
            { id: "history_social_interest", text: "History/Social Studies", type: "rating-scale" },
            { id: "geography_interest", text: "Geography", type: "rating-scale" },
            { id: "art_design_interest", text: "Art/Design", type: "rating-scale" },
            { id: "political_science_interest", text: "Political Science", type: "rating-scale" },
            { id: "finance_economics_interest", text: "Finance/Economics", type: "rating-scale" },
            { id: "physical_ed_interest", text: "Physical Education", type: "rating-scale" },
          ]
        }
      ]
    },
    {
        title: "Aptitude Testing",
        subsections: [
          {
            description: "Verbal Reasoning",
            questions: [
              { id: "verbal_1", text: "I easily understand the main point in complex texts", type: "rating-scale" },
              { id: "verbal_2", text: "I can quickly identify logical flaws in an argument", type: "rating-scale" },
              { id: "verbal_3", text: "I learn new vocabulary words easily", type: "rating-scale" },
              { id: "verbal_4", text: "I can explain complex ideas in simple terms", type: "rating-scale" }
            ]
          },
          {
            description: "Numerical Reasoning",
            questions: [
              { id: "numerical_1", text: "I can quickly perform calculations in my head", type: "rating-scale" },
              { id: "numerical_2", text: "I can easily identify patterns in numbers", type: "rating-scale" },
              { id: "numerical_3", text: "I can interpret data in charts/graphs", type: "rating-scale" },
              { id: "numerical_4", text: "I enjoy solving math problems", type: "rating-scale" }
            ]
          },
          {
            description: "Spatial Reasoning",
            questions: [
              { id: "spatial_1", text: "I can visualize folded paper unfolded", type: "rating-scale" },
              { id: "spatial_2", text: "I can mentally rotate 3D objects", type: "rating-scale" },
              { id: "spatial_3", text: "I can read maps/diagrams easily", type: "rating-scale" },
              { id: "spatial_4", text: "I can visualize parts forming whole", type: "rating-scale" }
            ]
          },
          {
            description: "Logical Reasoning",
            questions: [
              { id: "logical_1", text: "I identify patterns between concepts", type: "rating-scale" },
              { id: "logical_2", text: "I solve logical puzzles well", type: "rating-scale" },
              { id: "logical_3", text: "I draw valid conclusions", type: "rating-scale" },
              { id: "logical_4", text: "I identify system principles", type: "rating-scale" }
            ]
          },
          {
            description: "Creative Thinking",
            questions: [
              { id: "creative_1", text: "I come up with unique solutions", type: "rating-scale" },
              { id: "creative_2", text: "I think of multiple uses for objects", type: "rating-scale" },
              { id: "creative_3", text: "I enjoy creative expression", type: "rating-scale" },
              { id: "creative_4", text: "I think outside the box", type: "rating-scale" }
            ]
          }
        ]
      },
      {
        title: "Personality Factors",
        subsections: [
          {
            description: "Big Five Personality Traits",
            questions: [
              // Openness
              { id: "openness_1", text: "I am curious about many things", type: "rating-scale" },
              { id: "openness_2", text: "I think about abstract concepts", type: "rating-scale" },
              { id: "openness_3", text: "I enjoy new experiences", type: "rating-scale" },
              { id: "openness_4", text: "I appreciate art/music", type: "rating-scale" },
    
              // Conscientiousness
              { id: "conscientiousness_1", text: "I am organized", type: "rating-scale" },
              { id: "conscientiousness_2", text: "I plan ahead", type: "rating-scale" },
              { id: "conscientiousness_3", text: "I pay attention to details", type: "rating-scale" },
              { id: "conscientiousness_4", text: "I complete tasks thoroughly", type: "rating-scale" },
    
              // Extraversion
              { id: "extraversion_1", text: "I enjoy socializing", type: "rating-scale" },
              { id: "extraversion_2", text: "I am talkative", type: "rating-scale" },
              { id: "extraversion_3", text: "I feel energized with people", type: "rating-scale" },
              { id: "extraversion_4", text: "I prefer group activities", type: "rating-scale" },
    
              // Agreeableness
              { id: "agreeableness_1", text: "I am sympathetic", type: "rating-scale" },
              { id: "agreeableness_2", text: "I enjoy helping others", type: "rating-scale" },
              { id: "agreeableness_3", text: "I trust people", type: "rating-scale" },
              { id: "agreeableness_4", text: "I avoid conflicts", type: "rating-scale" },
    
              // Emotional Stability
              { id: "emotional_1", text: "I remain calm in stress", type: "rating-scale" },
              { id: "emotional_2", text: "I rarely feel anxious", type: "rating-scale" },
              { id: "emotional_3", text: "I handle pressure well", type: "rating-scale" },
              { id: "emotional_4", text: "I seldom feel overwhelmed", type: "rating-scale" }
            ]
          },
          {
            description: "Learning Styles",
            questions: [
              { id: "learning_1", text: "I learn by reading/writing", type: "rating-scale" },
              { id: "learning_2", text: "I remember visual information", type: "rating-scale" },
              //{ id: "learning_3", text: "I prefer listening", type: "rating-scale" },
              { id: "learning_4", text: "I learn hands-on", type: "rating-scale" },
              { id: "learning_5", text: "I enjoy trial and error", type: "rating-scale" },
              { id: "learning_6", text: "I prefer step-by-step", type: "rating-scale" }
            ]
          },
          {
            description: "Work Preferences",
            questions: [
              { id: "work_1", text: "I prefer independent work", type: "rating-scale" },
              { id: "work_2", text: "I enjoy leadership roles", type: "rating-scale" },
              { id: "work_3", text: "I prefer structured tasks", type: "rating-scale" },
              { id: "work_4", text: "I enjoy competition", type: "rating-scale" },
              { id: "work_5", text: "I prefer fast-paced work", type: "rating-scale" },
              { id: "work_6", text: "I am detail-oriented", type: "rating-scale" },
              { id: "work_7", text: "I prefer creative work", type: "rating-scale" }
            ]
          }
        ]
      },
      {
        title: "Career Values",
        subsections: [
          {
            description: "Work Environment Values",
            questions: [
              { id: "independence_value", text: "Working independently", type: "rating-scale" },
              { id: "structure_value", text: "Structured work routine", type: "rating-scale" },
              { id: "team_collaboration_value", text: "Collaborative team environment", type: "rating-scale" },
              { id: "variety_value", text: "Varied responsibilities", type: "rating-scale" },
              { id: "physical_activity_value", text: "Physically active work", type: "rating-scale" },
              { id: "low_stress_value", text: "Calm/low-stress environment", type: "rating-scale" }
            ]
          },
          {
            description: "Achievement Values",
            questions: [
              { id: "recognition_value", text: "Receiving recognition", type: "rating-scale" },
              { id: "advancement_value", text: "Career advancement", type: "rating-scale" },
              { id: "expertise_value", text: "Becoming an expert", type: "rating-scale" },
              { id: "impact_value", text: "Making significant impact", type: "rating-scale" },
              { id: "challenge_value", text: "Challenging work", type: "rating-scale" },
              { id: "concrete_tasks_value", text: "Concrete tasks", type: "rating-scale" }
            ]
          },
          {
            description: "Practical Values",
            questions: [
              { id: "job_security_value", text: "Job security", type: "rating-scale" },
              { id: "income_potential_value", text: "High income potential", type: "rating-scale" },
              { id: "work_life_balance_value", text: "Work-life balance", type: "rating-scale" },
              //{ id: "benefits_value", text: "Comprehensive benefits", type: "rating-scale" },
              //{ id: "travel_opportunity_value", text: "Travel opportunities", type: "rating-scale" },
              //{ id: "location_value", text: "Geographic location", type: "rating-scale" },
              { id: "flexibility_value", text: "Flexible hours", type: "rating-scale" }
            ]
          },
          {
            description: "Self-Expression Values",
            questions: [
              { id: "creativity_value", text: "Expressing creativity", type: "rating-scale" },
              { id: "ethical_alignment_value", text: "Moral/ethical alignment", type: "rating-scale" },
              { id: "autonomy_value", text: "Decision-making autonomy", type: "rating-scale" },
              { id: "growth_learning_value", text: "Continued learning", type: "rating-scale" },
              { id: "personal_interest_value", text: "Matching personal interests", type: "rating-scale" },
              { id: "social_impact_value", text: "Positive societal impact", type: "rating-scale" }
            ]
          }
        ]
      },
      {
        title: "External Factors",
        subsections: [
           {
            description: "Geographic Preferences",
            questions: [
              { 
                id: "environment_preference", 
                text: "Preferred living/working environment", 
                type: "multiple-choice",
                options: ["Urban", "Suburban", "Rural", "No preference"]
              },
              { 
                id: "relocation_willingness", 
                text: "Willingness to relocate", 
                type: "rating-scale" 
              }
            ]
          },
        ]
      }  
    ];