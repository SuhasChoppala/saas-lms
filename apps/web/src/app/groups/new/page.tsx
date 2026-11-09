import { auth } from "@clerk/nextjs/server";
import { CreateGroupForm } from "./create-group-form";

export default async function GroupNewPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">Create a new Group</h1>
      <CreateGroupForm />
    </main>
  );
}
