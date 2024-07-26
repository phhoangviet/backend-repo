import { Request } from "express";
import { User } from "./user.entity";

export interface DataStoredInToken {
  username: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
export interface RequestWithUser extends Request {
  user: User;
}
