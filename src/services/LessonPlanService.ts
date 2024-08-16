import axios from "axios";
import { LessonPlan } from "../interfaces";

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
