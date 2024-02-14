import { Request, Response, NextFunction } from "express";
import { user } from "../../models/user.model";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import jsonGenerator from "csvtojson";
import { decodeRole } from "../../utils/getRole";
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

export const registerMultipleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filepath = path.join(__dirname, "/uploads/data.csv");
    const data: Array<user> = await jsonGenerator().fromFile(filepath);
    data.forEach(async (item) => {
      const hashedPassword = await bcrypt.hash(item.password, 10);
      await prisma.user.create({
        data: {
          rollNo: item.rollNo,
          firstName: item.firstName,
          middleName: item.middleName,
          lastName: item.lastName,
          email: item.email,
          phoneNo: item.phoneNo,
          password: hashedPassword,
          role: decodeRole(item.role),
          department_name: item.department_name,
          joining_year: Number(item.joining_year),
          passout_year: Number(item.passout_year),
        },
        select: {
          email: true,
        },
      });
    });
    fs.unlink(filepath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully.");
      }
    });
    res.status(200).json({
      type: "Success",
      msg: "Users inserted Successfully",
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};
