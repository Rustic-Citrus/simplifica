import axios, { AxiosResponse, AxiosInstance } from "axios";
import { LessonPlan } from "../interfaces";

export class LessonPlanService {
  #instance: AxiosInstance;
  #userId: string;

  constructor(baseUrl: string, userId: string) {
    this.#instance = axios.create({
      baseURL: baseUrl,
    });
    this.#userId = userId;
  }

  getInstance(): AxiosInstance {
    return this.#instance;
  }

  getUserId(): string {
    return this.#userId;
  }

  async getLessonPlans(): Promise<AxiosResponse | string> {
    try {
      const response = await this.#instance.get(
        `/${this.#userId}/lesson-plans`
      );
      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  async getOneLessonPlan(lessonId: string): Promise<AxiosResponse | string> {
    try {
      const response = await this.#instance.get(
        `/${this.#userId}/lesson-plans/${lessonId}`
      );
      return response;
    } catch (error: any) {
      return error.message;
    }
  }

  async createLessonPlan(
    lessonPlan: LessonPlan
  ): Promise<AxiosResponse | string> {
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

  async updateLessonPlan(
    lessonId: string,
    newLessonPlan: LessonPlan
  ): Promise<AxiosResponse | string> {
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

  async deleteLessonPlan(lessonId: string): Promise<AxiosResponse | string> {
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
