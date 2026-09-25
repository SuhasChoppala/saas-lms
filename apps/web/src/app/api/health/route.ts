import { connectDb } from "@ledger/db";

export async function GET() {
  const mongoose = await connectDb();
  await mongoose.connection.db?.admin().ping();
  return Response.json({ status: "ok", db: "ok" });
}
