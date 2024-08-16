import { LessonPlan } from "./LessonPlan"

export interface User {
    _id: string,
    username: string,
    password: string,
    lesson_plans: LessonPlan[]
}