import express from "express";
import {
  registerUserCtrl,
  loginUserCtrl,
} from "../../authentication/controller";
import { registrationValidator } from "../../middlewares/validator";
const authRouter = express.Router();

authRouter.use(express.json());

authRouter.post("/register", registrationValidator, registerUserCtrl);
authRouter.post("/login", loginUserCtrl);

export default authRouter;
