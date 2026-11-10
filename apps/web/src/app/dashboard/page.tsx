import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDb, UserModel } from "@edforge/db";
import { PageShell } from "@/components/page-shell";

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
    <PageShell title="Dashboard">
      <dl className="space-y-2 text-sm">
        <div>
          <dt className="inline text-muted-foreground">Email: </dt>
          <dd className="inline">{userDoc?.email}</dd>
        </div>
        <div>
          <dt className="inline text-muted-foreground">User Clerk ID: </dt>
          <dd className="inline font-mono">{userDoc?.clerkId}</dd>
        </div>
        <div>
          <dt className="inline text-muted-foreground">Organization: </dt>
          <dd className="inline font-mono">{orgId ?? "none"}</dd>
        </div>
        <div>
          <dt className="inline text-muted-foreground">Role: </dt>
          <dd className="inline font-mono">{orgRole ?? "none"}</dd>
        </div>
      </dl>
    </PageShell>
  );
}
