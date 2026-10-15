import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @edforge/db ships raw TypeScript (no build step). Turbopack compiles it
  // anyway via the workspace symlink; this keeps webpack builds working too.
  transpilePackages: ["@edforge/db"],
};

export default nextConfig;
