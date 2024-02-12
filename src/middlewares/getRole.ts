import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import { decodeRole } from "../utils/role";

export const isAdmin = (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const role = req.role;
  if (role) {
    const is_authorized = decodeRole(role);
    if (is_authorized === "ADMIN") {
      next();
    } else {
      return next(new errorHandler(401, "No Admin Access"));
    }
  } else {
    return next(new errorHandler(404, "something went wrong"));
  }
};

export const isProfessor = (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  const role = req.role;
  if (role) {
    const is_authorized = decodeRole(role);
    if (is_authorized === "PROFESSOR") {
      next();
    } else if (is_authorized === "ADMIN") {
      next();
    } else {
      return next(new errorHandler(401, " Access Denied"));
    }
  } else {
    return next(new errorHandler(404, "something went wrong"));
  }
};
