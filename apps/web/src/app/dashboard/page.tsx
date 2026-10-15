import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDb, UserModel } from "@edforge/db";

export default async function DashboardPage() {
  const { userId, orgId, orgRole, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  await connectDb();

  const user = await currentUser();

  if (!user) return redirectToSignIn();

  const userDoc = await UserModel.findOneAndUpdate(
    { clerkId: userId },
    {
      name: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
      imageUrl: user.imageUrl,
    },
    {
      returnDocument: "after",
      upsert: true,
      runValidators: true,
    },
  );

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <dl className="mt-6 space-y-2 text-sm">
        <div>
          <dt className="inline text-zinc-500">Email: </dt>
          <dd className="inline">{userDoc?.email}</dd>
        </div>
        <div>
          <dt className="inline text-zinc-500">User Clerk ID: </dt>
          <dd className="inline font-mono">{userDoc?.clerkId}</dd>
        </div>
        <div>
          <dt className="inline text-zinc-500">Organization: </dt>
          <dd className="inline font-mono">{orgId ?? "none"}</dd>
        </div>
        <div>
          <dt className="inline text-zinc-500">Role: </dt>
          <dd className="inline font-mono">{orgRole ?? "none"}</dd>
        </div>
      </dl>
    </main>
  );
}
