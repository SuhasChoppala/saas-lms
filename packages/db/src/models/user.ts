import mongoose from "mongoose";
import type { InferSchemaType, Model } from "mongoose";
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

export type User = InferSchemaType<typeof userSchema>;

export const UserModel =
  (mongoose.models.User as Model<User> | undefined) ?? mongoose.model<User>("User", userSchema);
