import axios, { AxiosInstance } from "axios";
import { UserRequest, UserResponse } from "../interfaces";

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

  generateErrorResponse(errorMessage: string): UserResponse {
    return {
      status: 500,
      data: {
        msg: errorMessage,
        user: null,
      },
    };
  }

  async login(userData: UserRequest): Promise<UserResponse> {
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

  async logout(): Promise<UserResponse> {
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

  async register(userData: UserRequest): Promise<UserResponse> {
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

  async authenticate(): Promise<UserResponse> {
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
