import { NextFunction, Request, Response } from "express";
import UserModel from "../../model/user.model";
import ErrorHandler from "../../middleware/error";
import { ReqauthObject } from "../../schema/user.schema";
import { Roles } from "../../config/roles.config";
import bcrypt from "bcrypt";

export const handleRegister = async (
  req: Request<{}, {}, ReqauthObject>,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  try {
    const userRollNoAlreadyExists = await UserModel.find({
      rollnumber: data.rollnumber,
    });
    if (userRollNoAlreadyExists.length !== 0) {
      return res.status(409).json({
        type: "warning",
        message: "duplicate rollNumber",
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new UserModel({
        rollnumber: req.body.rollnumber,
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        phone_number: req.body.phone_number,
        password: hashedPassword,
        role: Roles["STUDENT"],
        email: req.body.email,
        department_id: req.body.department_id,
        joining_date: req.body.joining_date,
        leaving_date: req.body.leaving_date,
      });
      const user = await newUser.save();
      res.status(201).json({
        type: "success",
        message: "new user created successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
