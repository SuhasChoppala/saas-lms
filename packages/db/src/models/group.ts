import mongoose from "mongoose";
import type { InferSchemaType, Model } from "mongoose";
const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    clerkOrgId: { type: String, required: true, unique: true },
    ownerClerkId: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9-]+$/,
    },
    name: { type: String, required: true, maxlength: 80, trim: true },
    description: { type: String, maxlength: 2000 },
    accessType: { type: String, enum: ["free", "paid"], default: "free" },
    priceCurrency: { type: String, required: true, default: "usd", lowercase: true },
    priceInMinorUnits: { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true },
);

export type Group = InferSchemaType<typeof groupSchema>;

export const GroupModel =
  (mongoose.models.Group as Model<Group> | undefined) ??
  mongoose.model<Group>("Group", groupSchema);
