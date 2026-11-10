import { SignUp } from "@clerk/nextjs";
import { PageShell } from "@/components/page-shell";

export default function SignUpPage() {
  return (
    <PageShell title="Sign up">
      <SignUp />
    </PageShell>
  );
}
