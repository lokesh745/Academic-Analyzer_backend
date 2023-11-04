import { env } from "../config/env";

const user_secret = env.USER_ROLE;
const admin_secret = env.ADMIN_ROLE;
const superadmin_secret = env.SUPERADMIN_ROLE;

const getRole = (
  roleSecret: string
): "STUDENT" | "PROFESSOR" | "ADMIN" | undefined => {
  if (roleSecret === user_secret) return "STUDENT";
  if (roleSecret === admin_secret) return "PROFESSOR";
  if (roleSecret === superadmin_secret) return "ADMIN";
  return undefined;
};

export default getRole;
