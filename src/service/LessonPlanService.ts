import axios from "axios";

interface LessonPlan {
  "topic": string,
  "date": string,
  "presentation": {
    "objective": string,
    "materials": string[],
    "connection": string
  },
  "practice": {
    "real_life_application": string,
    "feedback_method": string,
    "activities": string[]
  },
  "production": {
    "learner_interaction": string,
    "success_criteria": string[],
    "activities": string[]
  }
}

export default class LessonPlanService {
  #instance;
  #userId;

  constructor(baseUrl: string, userId: string) {
    this.#instance = axios.create({
      baseURL: baseUrl,
    });
    this.#userId = userId;
  }

  getInstance() {
    return this.#instance;
  }

  getUserId() {
    return this.#userId;
  }

  async getLessonPlans() {
    try {
      const response = await this.#instance.get(
        `/${this.#userId}/lesson-plans`
      );
      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  async getOneLessonPlan(lessonId: string) {
    try {
      const response = await this.#instance.get(
        `/${this.#userId}/lesson-plans/${lessonId}`
      );
      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  async createLessonPlan(lessonPlan: LessonPlan) {
    try {
      const response = await this.#instance.post(
        `/${this.#userId}/lesson-plans`,
        {
          lessonPlan,
        }
      );
      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  async updateLessonPlan(lessonId: string, newLessonPlan: LessonPlan) {
    try {
      const response = await this.#instance.put(
        `/${this.#userId}/lesson-plans/${lessonId}`,
        { newLessonPlan }
      );

      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  async deleteLessonPlan(lessonId: string) {
    try {
      const response = await this.#instance.delete(
        `/${this.#userId}/lesson-plans/${lessonId}`
      );
      return response;
    } catch (error: any) {
      return error.message;
    }
  }
}
