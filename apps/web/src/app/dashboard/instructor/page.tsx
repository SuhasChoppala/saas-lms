import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/page-shell";

export default async function InstructorPage() {
  const { userId, orgId, orgRole, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  if (!orgId) redirect("/dashboard");
  if (orgRole !== "org:admin") redirect("/dashboard");

  return (
    <PageShell title="Instructor tools">
      <p className="text-sm text-muted-foreground">
        Only the owner of this group can see this page.
      </p>
    </PageShell>
  );
}
