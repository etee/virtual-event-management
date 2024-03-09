import { NextFunction, Request, Response } from "express";
import { ValidationResult } from "joi";
import userSchema from "../models/user.model";
import { ERR_MALFORMED_REQUEST, HTTP_CODES } from "../constants";

const registrationValidator = (
  req: Request,
  response: Response,
  next: NextFunction
) => {
  const validatedUserResponse: ValidationResult = userSchema.validate(
    req.body,
    { abortEarly: false }
  );
  if (validatedUserResponse.error) {
    return response.status(HTTP_CODES.BAD_REQUEST).json({
      message: ERR_MALFORMED_REQUEST,
      errors: validatedUserResponse.error.details.map((error) => error.message),
    });
  }
  next();
};

export { registrationValidator };
