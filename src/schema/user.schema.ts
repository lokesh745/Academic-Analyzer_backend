import { z } from "zod";
// const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;
//user login schema
export const emailAndPassword = z.object({
  email: z.string({ required_error: "email is not defined" }),
  password: z.string({ required_error: "password is not defined !" }),
});

export const registerInfo = z.object({
  rollnumber: z.string({ required_error: "roll number is not defined" }),
  fname: z.string({ required_error: "fname is not defined" }),
  mname: z.string({ required_error: "mname is not defined" }),
  lname: z.string({ required_error: "lname is not defined" }),
  phone_number: z.number({ required_error: "phone number is not defined" }),
  password: z.string({ required_error: "password is not defined" }),
  role: z.string({ required_error: "role is not defined" }),
  department_id: z.string({ required_error: "department_id is not defined" }),
  joining_date: z.string(),
  leaving_date: z.string(),
});

export const authObject = registerInfo.merge(emailAndPassword);
export type ReqauthObject = z.infer<typeof authObject>;
export type ReqEmailAndPassword = z.infer<typeof emailAndPassword>;
