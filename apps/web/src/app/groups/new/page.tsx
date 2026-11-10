import { auth } from "@clerk/nextjs/server";
import { PageShell } from "@/components/page-shell";
import { CreateGroupForm } from "./create-group-form";

export default async function GroupNewPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <PageShell title="Create a new Group">
      <CreateGroupForm />
    </PageShell>
  );
}
