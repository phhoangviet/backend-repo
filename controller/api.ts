import { Request, Response } from "express";
import {
  createCookie,
  createToken,
  handleCreateUser,
  handleFindUser,
} from "../repository/userCollection";
import { compare, hash } from "bcrypt";
import { RequestWithUser } from "../entities/user.interface";

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response<{ code: string; error?: string; data: any }>> => {
  const { username, password } = req.body;
  const findUser = await handleFindUser(username);
  if (findUser.existed) {
    return res.status(200).json({ error: "username existed" });
  }

  const hashPass: string = await hash(password, 10);
  await handleCreateUser(username, hashPass);
  return res.status(200).json({ data: "ok" });
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response<{ code: string; error?: string; data: any }>> => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(200)
      .json({ code: 400, error: "Please input your username" });
  }
  if (!password) {
    return res
      .status(200)
      .json({ code: 400, error: "Please input your password" });
  }
  const findUser = await handleFindUser(username);
  if (!findUser.existed) {
    return res.status(200).json({ code: 404, error: "Not found username" });
  }
  if (findUser.data) {
    const isPasswordMatching: boolean = await compare(
      password,
      findUser.data.password
    );
    if (isPasswordMatching) {
      const tokenizer = createToken({ username: findUser.data.username });
      const createCookies = createCookie(tokenizer);
      res.header("Set-Cookie", [createCookies]);
      return res.status(200).json({
        code: 200,
        data: {
          username: findUser.data.username,
          accessToken: tokenizer.token,
        },
      });
    } else {
      return res.status(200).json({ code: 400, error: "Password incorrect" });
    }
  }
  return res.status(200).json({ code: 500, error: "Internal server error" });
};
export const getUser = async (
  req: Request | RequestWithUser,
  res: Response
): Promise<Response<{ code: string; error?: string; data: any }>> => {
  const { username } = (req as RequestWithUser).user;
  if (!username) {
    res.status(200).json({ code: 400, error: "Failed to get user." });
  }
  const findUser = await handleFindUser(username);
  if (findUser.existed && findUser.data?.username) {
    return res
      .status(200)
      .json({ code: 200, data: { username: findUser.data.username } });
  }

  return res.status(200).json({ code: 400, error: "Failed to get user." });
};
