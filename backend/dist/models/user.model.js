import { Schema, model } from "mongoose";
const userSchema = new Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    displayName: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
    provider: { type: String, enum: ["google", "outlook"] },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: false,
});
const User = model("User", userSchema);
export default User;
