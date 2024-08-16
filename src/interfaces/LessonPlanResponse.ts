import { LessonPlan } from "./LessonPlan";

export interface LessonPlanResponse {
    status: number,
    data: {
        msg: string,
        lessonPlan: LessonPlan,
        lessonPlans: LessonPlan[]
    };
}