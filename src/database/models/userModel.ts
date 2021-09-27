import { Schema, model } from "mongoose";
import { User } from "../../types/User";

const userSchema = new Schema<User>({
  id: String,
  fullName: String,
  email: String,
  password: String,
  delete: Boolean
});

const userModel = model<User>("User", userSchema);
export { userModel };
