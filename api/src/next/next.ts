import next from "next";

// @ts-ignore
export const nextJsApp = next({
  dev: process.env.NODE_ENV !== "production",
  dir: import.meta.dirname,
});

export const nextJsRequestHandler = nextJsApp.getRequestHandler();
