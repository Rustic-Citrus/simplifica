export interface LessonPlan {
  topic: string;
  date: string;
  presentation: {
    objective: string;
    materials: string[];
    connection: string;
  };
  practice: {
    real_life_application: string;
    feedback_method: string;
    activities: string[];
  };
  production: {
    learner_interaction: string;
    success_criteria: string[];
    activities: string[];
  };
}
