import axios from "axios";
import { UserData, Response } from "../interfaces";

export class UserService {
  #instance;

  constructor(baseUrl: string) {
    this.#instance = axios.create({
      baseURL: baseUrl,
    });
  }

  getInstance() {
    return this.#instance;
  }

  generateErrorResponse(error: any): Response {
    return {
      status: 500,
      data: {
        msg: error.message,
        user: null
      },
    };
  }

  async login(userData: UserData): Promise<Response> {
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

  async logout(): Promise<Response> {
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

  async register(userData: UserData): Promise<Response> {
    try {
      const response = await this.#instance.post("/register", userData, {
        validateStatus: (status) => status < 500,
      });
      return response;
    } catch (error) {
      return this.generateErrorResponse(error);
    }
  }

  async authenticate(): Promise<Response> {
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
