import { Router } from "express";
import { renderToString } from "vue/server-renderer";
import { createApp } from "./entrypoint-app.js";
import { vueTemplate } from "./entrypoint-vueTemplate.js";

/**
 * Defines all the entrypoint routes that will do SSR of a Vue app and serve it.
 */
export function entrypoints() {
  const r = Router();

  r.get("/ssr-app", async function (_req, res, _next) {
    // This must choose the right app to load using 'createApp' just like how
    // entrypoints does it.
    const renderedHtml = await renderToString(createApp());

    res.status(200).send(vueTemplate(renderedHtml));
  });

  return r;
}
