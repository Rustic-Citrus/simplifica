import {
  LessonPlanResponse,
  UserResponse,
  User,
  LessonPlan,
} from "../interfaces";

export const DEFAULT_USER: User = {
  _id: "",
  username: "",
  password: "",
  lesson_plans: [],
};

export const DEFAULT_LESSON_PLAN: LessonPlan = {
  _id: "",
  topic: "",
  date: "",
  presentation: {
    objective: "",
    materials: [],
    connection: "",
  },
  practice: {
    real_life_application: "",
    feedback_method: "",
    activities: [],
  },
  production: {
    learner_interaction: "",
    success_criteria: [],
    activities: [],
  },
};

export const DEFAULT_USER_RESPONSE: UserResponse = {
  status: 500,
  data: {
    msg: "",
    user: DEFAULT_USER,
  },
};

export const DEFAULT_LESSON_PLAN_RESPONSE: LessonPlanResponse = {
  status: 500,
  data: {
    msg: "",
    lessonPlan: DEFAULT_LESSON_PLAN,
    lessonPlans: [],
  },
};
