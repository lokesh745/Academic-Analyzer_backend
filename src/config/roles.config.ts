import { env } from "./env";

const user_secret = env.USER_ROLE;
const admin_secret = env.ADMIN_ROLE;
const superadmin_secret = env.SUPERADMIN_ROLE;

export const Roles = {
  STUDENT: user_secret,
  PROFESSOR: admin_secret,
  ADMIN: superadmin_secret,
};
