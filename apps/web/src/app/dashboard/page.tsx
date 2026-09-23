import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId, orgId, orgRole } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <dl className="mt-6 space-y-2 text-sm">
        <div>
          <dt className="inline text-zinc-500">Email: </dt>
          <dd className="inline">{user?.primaryEmailAddress?.emailAddress}</dd>
        </div>
        <div>
          <dt className="inline text-zinc-500">User ID: </dt>
          <dd className="inline font-mono">{userId}</dd>
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
