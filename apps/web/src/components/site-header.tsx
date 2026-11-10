import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <Link href="/" className="font-semibold">
        edforge
      </Link>

      <nav className="flex items-center gap-4">
        <ThemeToggle />
        <Show when="signed-in">
          <Link href="/dashboard" className="text-sm text-muted-foreground">
            Dashboard
          </Link>
          <OrganizationSwitcher />
          <UserButton />
        </Show>

        <Show when="signed-out">
          <SignInButton>
            <Button variant="ghost">Sign in</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign up</Button>
          </SignUpButton>
        </Show>
      </nav>
    </header>
  );
}
