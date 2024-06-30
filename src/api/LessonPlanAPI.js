import axios from "axios";

export default class LessonPlanAPI {
  #instance;
  #userId

  constructor(baseUrl, userId) {
    this.#instance = axios.create({
      baseURL: baseUrl,
    });
    this.#userId = userId;
  }

  async getLessonPlans() {
    try {
      const response = await this.#instance.get(`/${this.#userId}/lesson-plans`);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  async createLessonPlan(lessonPlan) {
    try {
      const response = await this.#instance.post(`/${this.#userId}/lesson-plans`, {
        lessonPlan,
      });

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