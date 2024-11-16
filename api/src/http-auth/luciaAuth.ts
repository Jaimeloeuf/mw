import { GitHub } from "arctic";
import { Lucia } from "lucia";

import { config } from "../config/index.js";
import { adapter } from "./luciaAdapter.js";

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: config.env === "production",
    },
  },
});

export const luciaAuthForGithub = new GitHub(
  config.auth_github_oauth_client_id,
  config.auth_github_oauth_client_secret,
  config.auth_github_oauth_redirect_uri,
);
