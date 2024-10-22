import fs from "fs/promises";
import path from "path";
import express from "express";

async function bootstrapHttpServer() {
  express()
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

    // Simple logging middleware for debugging
    .use((req, _res, next) => {
      console.log(req.method, req.url);
      next();
    })

    .get("/", async (_, res) => {
      const rootHtml = await fs.readFile(
        path.resolve(import.meta.dirname, "../dist/index.html"),
        "utf8"
      );
      res.status(200).send(rootHtml);
    })

    .use(express.static("dist"))

    .use((_, res) => {
      res.status(404).send();
    })

    .listen(8080, () => console.log("Server running on 8080"));
}

bootstrapHttpServer();
