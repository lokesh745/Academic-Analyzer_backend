import { Request, Response, NextFunction } from "express";
import { user } from "../../models/user.model";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async (
  req: Request<{}, {}, user>,
  res: Response,
  next: NextFunction
) => {
  try {
    const old_user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (old_user) {
      return next(new errorHandler(409, "duplicate User With an Email"));
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await prisma.user.create({
        data: {
          rollNo: req.body.rollNo,
          firstName: req.body.firstName,
          middleName: req.body.middleName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNo: req.body.phoneNo,
          password: hashedPassword,
          role: req.body.role,
          department_name: req.body.department_name,
          joining_year: req.body.joining_year,
          passout_year: req.body.passout_year,
        },
        select: {
          email: true,
        },
      });
      res.status(201).json({
        type: "success",
        newUser,
        msg: "User Created Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return next(new errorHandler(500, "Internal Server Error"));
  }
};
