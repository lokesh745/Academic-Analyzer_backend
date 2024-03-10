import { Request, Response, NextFunction } from "express";
import { user } from "../../models/user.model";
import errorHandler from "../../utils/errorHandler";
import prisma from "../../utils/prisma";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import jsonGenerator from "csvtojson";
import { decodeRole } from "../../utils/getRole";
import axios from "axios";
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
  const filepath = path.join(__dirname, `../../../uploads/${req.fileName}`);
  const data: Array<user> = await jsonGenerator().fromFile(filepath);
  try {
    data.forEach(async (item) => {
      const hashedPassword = await bcrypt.hash(item.password, 10);
      const result = await prisma.user.findUnique({
        where: {
          rollNo: item.rollNo,
        },
      });
      if (!result) {
        const data = {
          to: item.email,
          user: req.uniqueIdentity,
          subject: "Test Email From Erp Platform",
          body: `Erp System Administrator
          username: ${item.email}
          password: ${item.password}
          `,
        };
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

        // email;

        // await axios.post(
        //   "http://localhost:4000/backend-email-service/email",
        //   data
        // );
        // console.log("executed");
      }
    });
    res.status(201).json({
      type: "Success",
      msg: "Users Registered Successfully",
    });
  } catch (error: any) {
    return next(new errorHandler(417, `${error.code}`));
  } finally {
    fs.unlink(filepath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully.");
      }
    });
  }
};
