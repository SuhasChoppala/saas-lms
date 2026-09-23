import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function InstructorPage() {
  const { userId, orgId, orgRole } = await auth();

  if (!userId) redirect("/sign-in");
  if (!orgId) redirect("/dashboard");
  if (orgRole !== "org:admin") redirect("/dashboard");

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">Instructor tools</h1>
      <p className="mt-4 text-sm text-zinc-500">Only the owner of this group can see this page.</p>
    </main>
  );
}
