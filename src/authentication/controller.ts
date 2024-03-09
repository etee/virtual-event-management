import { Request, Response, response } from "express";
import { registerUser, loginUser } from "./service";
import { HTTP_CODES } from "../constants";

const registerUserCtrl = async (req: Request, res: Response) => {
  const createdUser = await registerUser(req.body);
  return res.status(createdUser.status).json(createdUser.message);
};

const loginUserCtrl = async (req: Request, res: Response) => {
  const loggedInUser = await loginUser(req.body);
  if (loggedInUser.status === HTTP_CODES.OK) {
    return res
      .status(loggedInUser.status)
      .json({ token: loggedInUser.token, user: loggedInUser.user });
  }
  return res.status(loggedInUser.status).json(loggedInUser.message);
};

export { registerUserCtrl, loginUserCtrl };
