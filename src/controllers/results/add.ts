import { Request, Response, NextFunction } from "express";
import errorHandler from "../../utils/errorHandler";
import { result, result_multiple } from "../../models/result.model";
import prisma from "../../utils/prisma";
import fs from "fs";
import path from "path";
import jsonGenerator from "csvtojson";
import { result_data_object } from "../../utils/resultData";
import { resultDetails } from "../../utils/resultData";

export const addNewResult = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const filepath = path.join(__dirname, `../../../uploads/${req.fileName}`);
    const data: Array<result> = await jsonGenerator().fromFile(filepath);
    res.status(200).json({
      type: "Success",
      msg: "Result Added Successfully",
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};

export const addMultipleResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filepath = path.join(__dirname, `../../../uploads/${req.fileName}`);
    const data: Array<result_multiple> =
      await jsonGenerator().fromFile(filepath);
    data.forEach((item) => {
      const output = resultDetails(item.course_id);
      console.log(item);
    });
    res.status(200).json({
      type: "Success",
      msg: "Inserted",
    });
  } catch (error) {
    return next(new errorHandler(500, "Internal Server Error"));
  }
};
