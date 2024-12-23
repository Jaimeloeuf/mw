import type { NextConfig } from "next";

export default {
  output: "standalone",

  typescript: {
    // Cannot use main api tsconfig "../../tsconfig.json", so using the
    // 'Next Build' generated tsconfig with some modifications
    tsconfigPath: "./tsconfig.next.json",

    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors, since we assume that the main tsc/tsconfig
    // will be used to type check the next directory too.
    ignoreBuildErrors: true,
  },
} satisfies NextConfig;
