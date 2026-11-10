import { SignIn } from "@clerk/nextjs";
import { PageShell } from "@/components/page-shell";

export default function SignInPage() {
  return (
    <PageShell title="Sign in">
      <SignIn />
    </PageShell>
  );
}
