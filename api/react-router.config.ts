import type { Config } from "@react-router/dev/config";

export default {
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,

  // Where is the react-router based app located at?
  appDirectory: "./src/react",

  // buildDirectory
} satisfies Config;
