import express from "express";
import path from "path";

import { config } from "../config/index.js";
import { logger } from "../logging/index.js";

// @todo
// Short-circuit the type-checking of the built output.
const BUILD_PATH = "./build/server/index.js";

/**
 * Returns an express router that either uses the vite dev server to serve SSR
 * module or an express static middleware to serve pre-built SSR modules.
 */
export async function reactRouterService() {
  const router = express.Router();

  if (config.env() === "development") {
    logger.info(reactRouterService.name, `Using vite development server`);
    const vite = await import("vite");
    const viteDevServer = await vite.createServer({
      server: { middlewareMode: true },
    });
    router.use(viteDevServer.middlewares);
    router.use(async (req, res, next) => {
      try {
        const reactRouterAppPath = path.resolve(
          import.meta.dirname,
          "reactRouterApp.ts",
        );
        const ssrModule = await viteDevServer.ssrLoadModule(reactRouterAppPath);
        return await ssrModule["router"](req, res, next);
      } catch (error) {
        if (typeof error === "object" && error instanceof Error) {
          viteDevServer.ssrFixStacktrace(error);
        }
        next(error);
      }
    });
  } else {
    logger.info(
      reactRouterService.name,
      `Using production server + pre-built assets`,
    );
    router.use(
      "/assets",
      express.static("build/client/assets", { immutable: true, maxAge: "1y" }),
    );
    router.use(express.static("build/client", { maxAge: "1h" }));
    router.use(await import(BUILD_PATH).then((ssrModule) => ssrModule.router));
  }

  return router;
}
