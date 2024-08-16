import axios, { AxiosInstance } from "axios";
import { UserData, Response } from "../interfaces";

export class UserService {
  #instance: AxiosInstance;

  constructor(baseUrl: string) {
    this.#instance = axios.create({
      baseURL: baseUrl,
    });
  }

  getInstance(): AxiosInstance {
    return this.#instance;
  }

  generateErrorResponse(errorMessage: string): Response {
    return {
      status: 500,
      data: {
        msg: errorMessage,
        user: null,
      },
    };
  }

  async login(userData: UserData): Promise<Response> {
    try {
      const response = await this.#instance.post("/login", userData, {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      });

      return {
        status: response.status,
        data: {
          msg: response.data.msg,
          user: response.data.user,
        },
      };
    } catch (error: any) {
      return this.generateErrorResponse(error.message);
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

      return {
        status: response.status,
        data: {
          msg: response.data.msg,
          user: null,
        },
      };
    } catch (error: any) {
      return this.generateErrorResponse(error.message);
    }
  }

  async register(userData: UserData): Promise<Response> {
    try {
      const response = await this.#instance.post("/register", userData, {
        validateStatus: (status) => status < 500,
      });

      return {
        status: response.status,
        data: {
          msg: response.data.msg,
          user: response.data.user,
        }
      };
    } catch (error: any) {
      return this.generateErrorResponse(error.message);
    }
  }

  async authenticate(): Promise<Response> {
    try {
      const response = await this.#instance.post(
        "/",
        {},
        { withCredentials: true, validateStatus: (status) => status < 500 }
      );
      return {
        status: response.status,
        data: {
          msg: response.data.msg,
          user: response.data.user,
        }
      };
    } catch (error: any) {
      return this.generateErrorResponse(error.message);
    }
  }
}
