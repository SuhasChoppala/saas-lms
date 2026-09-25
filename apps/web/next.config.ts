import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ledger/db ships raw TypeScript (no build step). Turbopack compiles it
  // anyway via the workspace symlink; this keeps webpack builds working too.
  transpilePackages: ["@ledger/db"],
};

export default nextConfig;
