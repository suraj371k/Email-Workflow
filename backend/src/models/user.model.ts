import { Schema, model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  googleId: string;
  email: string;
  displayName?: string;
  accessToken?: string;
  refreshToken?: string;
  provider?: "google" | "outlook";
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    displayName: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
    provider: { type: String, enum: ["google" , "outlook"]},
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
