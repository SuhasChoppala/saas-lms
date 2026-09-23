import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton, OrganizationSwitcher } from "@clerk/nextjs";

export function SiteHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
      <Link href="/" className="font-semibold">
        Ledger
      </Link>

      <nav className="flex items-center gap-4">
        <Show when="signed-in">
          <Link href="/dashboard" className="text-sm text-zinc-600 dark:text-zinc-400">
            Dashboard
          </Link>
          <OrganizationSwitcher />
          <UserButton />
        </Show>

        <Show when="signed-out">
          <SignInButton>
            <button className="cursor-pointer text-sm">Sign in</button>
          </SignInButton>
          <SignUpButton>
            <button className="cursor-pointer rounded-full bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">
              Sign up
            </button>
          </SignUpButton>
        </Show>
      </nav>
    </header>
  );
}
