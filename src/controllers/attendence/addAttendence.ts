import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import fs from "fs";
import path from "path";
import jsonGenerator from "csvtojson";
import { attendence } from "../../models/attendence";
import axios from "axios";
export const addAttendence = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filepath = path.join(__dirname, `../../../uploads/${req.fileName}`);
  const data: Array<attendence> = await jsonGenerator().fromFile(filepath);
  try {
    data.forEach(async (item) => {
      const course = await prisma.course.findUnique({
        where: {
          id: item.course_id,
        },
      });
      const user = await prisma.user.findUnique({
        where: {
          rollNo: item.rollNo,
        },
      });
      if (course && user) {
        const res = await prisma.enrollment.findMany({
          where: {
            AND: [{ user_id: user.id }, { course_id: course.id }],
          },
        });
        if (res.length !== 0) {
          const duplicate = await prisma.attendence.findUnique({
            where: {
              courseId_userId_month_year: {
                courseId: course.id,
                userId: user.id,
                month: item.month,
                year: Number(item.year),
              },
            },
          });
          if (!duplicate) {
            await prisma.attendence.create({
              data: {
                courseId: course.id,
                userId: user.id,
                year: Number(item.year),
                month: item.month,
                total: Number(item.total),
                attended: Number(item.attended),
              },
            });

            let percentage: number;
            percentage = (item.attended / item.total) * 100;
            if (percentage < 40) {
              const data = {
                to: user.email,
                user: req.uniqueIdentity,
                subject: "Attendance Reminder: Action Required",
                body: `Dear Students of ${course.course_name},
  
                I am reaching out to address a concerning issue regarding attendance in our ${course.course_name} class.
                
                It has been brought to my attention that currently your attendance rate is below 40%. Attendance is crucial for your comprehension of the subject matter and overall success in the course.
                
                I kindly request you to schedule a meeting with me at your earliest convenience to discuss this matter further.
                
                Thank you for your attention to this matter.
  
                Best regards,
  
                ${req.uniqueIdentity}
  
                `,
              };
              // email;
              await axios.post(
                "http://localhost:4000/backend-email-service/email",
                data
              );
            }
          }
        }
      }
    });
    res.status(200).json({
      type: "Success",
      msg: "Attendence Added Successfully",
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};
