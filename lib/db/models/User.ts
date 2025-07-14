import { IUser } from "@/types";
import { Model, model, models, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isBlocked: { type: Boolean, default: false },
    profile: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel: Model<IUser> = models?.User || model("User", userSchema);
export default UserModel;
