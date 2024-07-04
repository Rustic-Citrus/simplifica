import axios from "axios";

export default class UserService {
  #instance;

  constructor(baseUrl) {
    this.#instance = axios.create({
      baseURL: baseUrl,
    });
  }

  getInstance() {
    return this.#instance;
  }

  async login(userData) {
    try {
      const response = await this.#instance.post("/login", userData, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async logout() {
    try {
      const response = await this.#instance.put(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );
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

  async authenticate() {
    try {
      const response = await this.#instance.post(
        "/",
        {},
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      return error.message;
    }
  }
}
