import {
  ERR_EXISTING_USER,
  ERR_INTERNAL_SERVER_ERROR,
  ERR_INVALID_PASSWORD,
  ERR_UNREGISTERED_USER,
  HTTP_CODES,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_REGISTRATION,
} from "../constants";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { readFromDatabase, writeToDatabase } from "../utils/file-transactions";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config";
import uniqid from "uniqid";

const registerUser = async (registrationDetails: any) => {
  const dataFromDB = await readFromDatabase();
  let existingUser = false;
  if (dataFromDB?.users?.length > 0) {
    existingUser = dataFromDB.users.find(
      (user: User) => user.email === registrationDetails.email
    );
  }
  if (!existingUser) {
    const id = uniqid();
    registrationDetails.password = bcrypt.hashSync(
      registrationDetails.password,
      8
    );
    const newUser = { ...registrationDetails, id };
    if (newUser.role === undefined) {
      newUser.role = "regular";
    }
    try {
      dataFromDB.users.push(newUser);
      await writeToDatabase(dataFromDB);
      return {
        status: HTTP_CODES.CREATED,
        message: SUCCESSFUL_REGISTRATION,
      };
    } catch {
      return {
        status: HTTP_CODES.INTERNAL_SERVER_ERROR,
        message: ERR_INTERNAL_SERVER_ERROR,
      };
    }
  } else {
    return {
      status: HTTP_CODES.FORBIDDEN,
      message: ERR_EXISTING_USER,
    };
  }
};

const loginUser = async (loginDetails: any) => {
  const dataFromDB = await readFromDatabase();
  let registeredUser = {} as User;
  if (dataFromDB?.users?.length > 0) {
    registeredUser = dataFromDB.users.find(
      (user: User) => user.email === loginDetails.email
    );
  }
  if (!registeredUser) {
    return {
      status: HTTP_CODES.NOT_FOUND,
      message: ERR_UNREGISTERED_USER,
    };
  }
  const comparePassword = bcrypt.compareSync(
    loginDetails.password,
    registeredUser.password
  );
  if (!comparePassword) {
    return {
      status: HTTP_CODES.UNAUTHORIZED,
      message: ERR_INVALID_PASSWORD,
    };
  } else {
    if (JWT_SECRET) {
      const signedToken = jsonwebtoken.sign(
        { id: registeredUser.id },
        JWT_SECRET,
        {
          expiresIn: 86400,
        }
      );
      return {
        status: HTTP_CODES.OK,
        message: SUCCESSFUL_LOGIN,
        token: signedToken,
        user: {
          id: registeredUser.id,
        },
      };
    } else {
      return {
        status: HTTP_CODES.INTERNAL_SERVER_ERROR,
        message: ERR_INTERNAL_SERVER_ERROR,
      };
    }
  }
};

export { registerUser, loginUser };
