import mongoose from "mongoose";
import type { InferSchemaType, Model } from "mongoose";
const { Schema } = mongoose;

const lessonSchema = new Schema({
  title: { type: String, required: true, maxlength: 120, trim: true },
  position: { type: Number, required: true, min: 0 },
});

const moduleSchema = new Schema({
  title: { type: String, required: true, maxlength: 120, trim: true },
  position: { type: Number, required: true, min: 0 },
  lessons: [lessonSchema],
});

const courseSchema = new Schema(
  {
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9-]+$/,
    },
    title: { type: String, required: true, maxlength: 120, trim: true },
    description: { type: String, maxlength: 2000 },
    status: { type: String, enum: ["draft", "published"], default: "draft", required: true },
    modules: [moduleSchema],
  },
  { timestamps: true },
);

courseSchema.index({ groupId: 1, slug: 1 }, { unique: true });

export type Course = InferSchemaType<typeof courseSchema>;

export const CourseModel =
  (mongoose.models.Course as Model<Course> | undefined) ??
  mongoose.model<Course>("Course", courseSchema);
