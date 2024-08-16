import { User } from "./User";

export interface UserResponse {
  status: number;
  data: {
    msg: string;
    user: User
  };
}
