import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  children: ReactNode;
};

export const PageShell = ({ title, children }: PageShellProps) => {
  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="mt-6">{children}</div>
    </main>
  );
};
