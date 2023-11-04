import { NextFunction, Request, Response } from "express";
import {
  ReqEmailAndPassword,
  emailAndPassword,
} from "../../schema/user.schema";
import * as JWT from "../../utils/jwt.utils";
import getRole from "../../utils/getRole.util";
import UserModel from "../../model/user.model";
import bcrypt from "bcrypt";

export const handleLogin = async (
  req: Request<{}, {}, ReqEmailAndPassword>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    let foundUser = await UserModel.find({ email });
    if (foundUser.length === 0) {
      return res.status(401).json({
        type: "warning",
        message: "email/password is incorrect",
      });
    } else {
    }
  } catch (error) {
    next(error);
  }
};
