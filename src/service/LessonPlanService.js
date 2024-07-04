import axios from "axios";

export default class LessonPlanService {
  #instance;
  #userId;

  constructor(baseUrl, userId) {
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
    } catch (error) {
      return error.message;
    }
  }

  async getOneLessonPlan(lessonId) {
    try {
      const response = await this.#instance.get(
        `/${this.#userId}/lesson-plans/${lessonId}`
      );
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async createLessonPlan(lessonPlan) {
    try {
      const response = await this.#instance.post(
        `/${this.#userId}/lesson-plans`,
        {
          lessonPlan,
        }
      );
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async updateLessonPlan(lessonId, newLessonPlan) {
    try {
      const response = await this.#instance.put(
        `/${this.#userId}/lesson-plans/${lessonId}`,
        { newLessonPlan }
      );

      return response;
    } catch (error) {
      return error.message;
    }
  }

  async deleteLessonPlan(lessonId) {
    try {
      const response = await this.#instance.delete(
        `/${this.#userId}/lesson-plans/${lessonId}`
      );
      return response;
    } catch (error) {
      return error.message;
    }
  }
}
