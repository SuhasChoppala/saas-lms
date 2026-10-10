import mongoose from "mongoose";
import type { InferSchemaType } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("User", userSchema);

export type User = InferSchemaType<typeof userSchema>;
