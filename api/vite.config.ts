import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => {
  const config: UserConfig = {
    plugins: [
      tailwindcss(),
      reactRouter(),
      tsconfigPaths(),
    ],
  };

  if (isSsrBuild) {
    config.build = {
      rollupOptions: {
        input: "./src/http/reactRouterApp.ts",
      },
    };
  }

  return config;
});
