import { NextFunction } from "express";
import { Request, Response } from "express";
import { secretKey } from "../config/env";
import { DataStoredInToken, RequestWithUser } from "../entities/user.interface";
import { verify } from "jsonwebtoken";
import ApiError from "../entities/apiError";
const getAuthorization = (
  req: Request | RequestWithUser
): string | undefined => {
  const cookie: string | undefined = req.cookies["Authorization"];
  if (cookie) return cookie;

  const header: string | undefined = req.header("Authorization");
  if (header) return header.split("Bearer ")[1];

  return undefined;
};
const AuthMiddleware = async (
  req: Request | RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const validateAuth = await getAuthorization(req);
    console.log(validateAuth);
    if (validateAuth) {
      const { username } = verify(validateAuth, secretKey) as DataStoredInToken;
      if (username) {
        (req as RequestWithUser).user = { username };
        return next();
      } else {
        return next(new ApiError(401, "Wrong authentication token"));
      }
    }
  } catch (error) {
    return next(new ApiError(401, "Authentication token missing"));
  }
};
export default AuthMiddleware;
