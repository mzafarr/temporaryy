import mongoose, { Schema } from "mongoose";
import { User } from "../lib/redux/types";

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  password: { type: String },
  points: { type: Number, default: 0 },
  resumes: [{ type: Schema.Types.ObjectId, ref: "Resume" }],
});

// const UserModel = mongoose.model<User>("User", userSchema);
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);
export default UserModel;
