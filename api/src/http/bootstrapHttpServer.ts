import express from "express";
import cors from "cors";

/**
 * Bootstraps a web server using ExpressJS to route incoming HTTP requests to
 * HTTP controllers.
 */
export function bootstrapHttpServer() {
  const app = express();

  app.use(cors());

  app
    /* Routes table */
    .get("/", (req, res) => {
      res.status(200).send("ok");
    })
    .get("/version", (req, res) => {
      res.status(200).send("-");
    })

    // Since this is the last non-error-handling route handler used, assume 404
    // as no other route handler responded.
    .use((req, res) => {
      res.status(404);

      if (req.accepts("json")) {
        res.json({ error: "Not found" });
        return;
      }

      // Defaults to plain-text
      res.type("txt").send("Not found");
    });

  app.listen(3000, () => {
    console.log(
      bootstrapHttpServer.name,
      `Web Server now listening on port: ${3000}`
    );
  });
}
