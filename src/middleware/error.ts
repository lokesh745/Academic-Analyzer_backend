import { Request, Response, NextFunction } from "express";

class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    type: "error",
    message: err.message,
  });
};

export default ErrorHandler;
