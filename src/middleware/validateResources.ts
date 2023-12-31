import { z, AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.utils";

const validateResources =
  (
    paramsSchema: AnyZodObject,
    bodySchema: AnyZodObject,
    querySchema: AnyZodObject
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const schema = z.object({
      params: paramsSchema,
      body: bodySchema,
      query: querySchema,
    });
    try {
      schema.parse({
        params: req.params,
        body: req.body,
        query: req.query,
      });
      next();
    } catch (err: any) {
      return res.status(400).json({
        type: "error",
        message: err.issues[0].message,
      });
    }
  };

export default validateResources;
