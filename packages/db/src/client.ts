import mongoose from "mongoose";

const globalForMongoose = globalThis as unknown as {
  mongooseConnection?: Promise<typeof mongoose>;
};

export function connectDb(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  globalForMongoose.mongooseConnection ??= mongoose.connect(uri).catch((error: unknown) => {
    globalForMongoose.mongooseConnection = undefined;
    throw error;
  });

  return globalForMongoose.mongooseConnection;
}
