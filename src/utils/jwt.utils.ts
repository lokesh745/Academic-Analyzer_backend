import jwt from "jsonwebtoken";
import { Roles } from "../config/roles.config";
import { env } from "../config/env";
import UserModel from "../model/user.model";
import getRole from "./getRole.util";
import { Types } from "mongoose";

export type TokenPayload = {
  userUniqueIdentity: Types.ObjectId;
  userRole: string;
};

export const signToken = (
  key: "ACCESS_TOKEN_PRIVATE" | "REFRESH_TOKEN_PRIVATE",
  id: Types.ObjectId,
  role: "STUDENT" | "PROFESSOR" | "ADMIN"
) => {
  const token_private_key = env[key];
  if (!token_private_key) throw Error(`${key} private secret not found`);

  const payload: TokenPayload = {
    userUniqueIdentity: id,
    userRole: Roles[role],
  };

  const expiresIn = key === "REFRESH_TOKEN_PRIVATE" ? "15m" : "30d";

  const token = jwt.sign(payload, token_private_key, {
    algorithm: "RS256",
    expiresIn,
  });

  return token;
};

export function verifyJwt(
  token: string,
  key: "ACCESS_TOKEN_PUBLIC" | "REFRESH_TOKEN_PUBLIC"
) {
  const token_public_key = env[key];
  if (!token_public_key) throw Error(`${key} public secret not found`);

  try {
    const decoded = jwt.verify(token, token_public_key) as TokenPayload;
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}
