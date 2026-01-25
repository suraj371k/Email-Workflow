import { Schema, Document, model, Types } from "mongoose";

interface IAI extends Document {
  _id: Types.ObjectId;
  userId: Schema.Types.ObjectId;
  priority: "high" | "medium" | "low" | "urgent";
  categories:
    | "spam"
    | "newsletter"
    | "urgent"
    | "unread"
    | "social"
    | "promotions";
  summary: string;
  language: "english" | "hindi";
  keyPoints: string[];
  createdAt: Date;
}

const gmailSchema = new Schema<IAI>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low", "urgent"],
    },
    categories: {
      type: String,
      enum: ["spam", "newsletter", "urgent", "unread", "social", "promotions"],
    },
    summary: {
      type: String,
    },
    keyPoints: {
      type: [String],
    },
  },
  { timestamps: true },
);

const AI = model("AI", gmailSchema);

export default AI;
