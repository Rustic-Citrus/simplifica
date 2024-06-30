import axios from "axios";

export default class UserAPI {
  #instance;

  constructor(baseUrl) {
    this.#instance = axios.create({
      baseURL: baseUrl,
    });
  }

  async login(userData) {
    try {
      const response = await this.#instance.post("/login", userData);

      return response;
    } catch (error) {
      return error.message;
    }
  }

  async logout() {
    try {
      const response = await this.#instance.put("/logout");

      return response;
    } catch (error) {
      return error.message;
    }
  }
  
  async register(userData) {
    try {
      const response = await this.#instance.post("/register", userData);

      return response;
    } catch (error) {
      return error.message;
    }
  }
}
