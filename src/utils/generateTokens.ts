import { user } from "../models/user.model";
import jwt from "jsonwebtoken";

export type payload = {
  email: string;
};

export const generateAccessToken = async (email: string) => {
  const data: payload = {
    email,
  };
  const secret_key: any = process.env.ACCESS_TOKEN_PUBLIC;
  const token: string = jwt.sign(data, secret_key, {
    algorithm: "HS256",
    expiresIn: "720m",
  });
  return token;
};
