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

  generateErrorResponse(error) {
    return {
      data: {
        msg: error.message,
      },
    };
  }

  async login(userData) {
    try {
      const response = await this.#instance.post("/login", userData, {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      });

      return response;
    } catch (error) {
      return this.generateErrorResponse(error);
    }
  }

  async logout() {
    try {
      const response = await this.#instance.put(
        "/logout",
        {},
        {
          withCredentials: true,
          validateStatus: (status) => status < 500,
        }
      );
      return response;
    } catch (error) {
      return this.generateErrorResponse(error);
    }
  }

  async register(userData) {
    try {
      const response = await this.#instance.post("/register", userData, {
        validateStatus: (status) => status < 500,
      });
      return response;
    } catch (error) {
      return this.generateErrorResponse(error);
    }
  }

  async authenticate() {
    try {
      const response = await this.#instance.post(
        "/",
        {},
        { withCredentials: true, validateStatus: (status) => status < 500 }
      );
      return response;
    } catch (error) {
      return this.generateErrorResponse(error);
    }
  }
}
