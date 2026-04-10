import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string;
  }
}

export const router = express.Router();

router.use(
  // @todo This base path should be shared between this and routes.ts
  "/intern",
  createRequestHandler({
    // This could be undefined, which breaks the type, so ignoring it for now
    // until the type could be better inferred.
    // @ts-ignore @todo
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express",
      };
    },
  }),
);

router.use("/", (_, res) => {
  res.send("No home page");
});
