import axios, { AxiosInstance } from "axios";
import { LessonPlan, LessonPlanResponse } from "../interfaces";
import { DEFAULT_LESSON_PLAN } from "../templates";

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

  getErrorResponse(errorMessage: string): LessonPlanResponse {
    return {
      status: 500,
      data: {
        msg: errorMessage,
        lessonPlan: DEFAULT_LESSON_PLAN,
        lessonPlans: [],
      },
    };
  }

  async getLessonPlans(): Promise<LessonPlanResponse> {
    try {
      const response = await this.#instance.get(
        `/${this.#userId}/lesson-plans`
      );
      return {
        status: response.status,
        data: {
          msg: response.data.msg,
          lessonPlan: DEFAULT_LESSON_PLAN,
          lessonPlans: response.data.lessonPlans,
        },
      };
    } catch (error: any) {
      return this.getErrorResponse(error.message);
    }
  }

  async getOneLessonPlan(lessonId: string): Promise<LessonPlanResponse> {
    try {
      const response = await this.#instance.get(
        `/${this.#userId}/lesson-plans/${lessonId}`
      );
      return {
        status: response.status,
        data: {
          msg: response.data.msg,
          lessonPlan: response.data.lessonPlan,
          lessonPlans: [],
        },
      };
    } catch (error: any) {
      return this.getErrorResponse(error.message);
    }
  }

  async createLessonPlan(lessonPlan: LessonPlan): Promise<LessonPlanResponse> {
    try {
      const response = await this.#instance.post(
        `/${this.#userId}/lesson-plans`,
        {
          lessonPlan,
        }
      );
      return {
        status: response.status,
        data: {
          msg: response.data.msg,
          lessonPlan: response.data.lessonPlan,
          lessonPlans: [],
        },
      };
    } catch (error: any) {
      return this.getErrorResponse(error.message);
    }
  }

  async updateLessonPlan(
    lessonId: string,
    newLessonPlan: LessonPlan
  ): Promise<LessonPlanResponse> {
    try {
      const response = await this.#instance.put(
        `/${this.#userId}/lesson-plans/${lessonId}`,
        { newLessonPlan }
      );

      return {
        status: response.status,
        data: {
          msg: response.data.msg,
          lessonPlan: response.data.lessonPlan,
          lessonPlans: [],
        },
      };
    } catch (error: any) {
      return this.getErrorResponse(error.message);
    }
  }

  async deleteLessonPlan(lessonId: string): Promise<LessonPlanResponse> {
    try {
      const response = await this.#instance.delete(
        `/${this.#userId}/lesson-plans/${lessonId}`
      );
      return {
        status: response.status,
        data: {
          msg: response.data.msg,
          lessonPlan: DEFAULT_LESSON_PLAN,
          lessonPlans: [],
        },
      };
    } catch (error: any) {
      return this.getErrorResponse(error.message);
    }
  }
}
