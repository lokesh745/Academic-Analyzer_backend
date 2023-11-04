import { Document, Model, model, Schema } from "mongoose";

export interface User {
  rollnumber: string;
  fname: string;
  mname: string;
  lname: string;
  email: string;
  phone_number: number;
  password: string;
  role: string;
  department_id: string;
  joining_date: Date;
  leaving_date: Date;
}

const userSchema = new Schema<User>({
  rollnumber: {
    type: String,
    required: true,
    default: null,
  },
  fname: {
    type: String,
    required: true,
  },
  mname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  department_id: {
    type: String,
    required: true,
  },
  joining_date: {
    type: Date,
    required: true,
  },
  leaving_date: {
    type: Date,
    required: true,
  },
});

const UserModel: Model<User> = model<User>("User", userSchema);
export default UserModel;
