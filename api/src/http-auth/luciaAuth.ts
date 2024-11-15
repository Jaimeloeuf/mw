import { GitHub } from "arctic";
import { Lucia } from "lucia";

import { config } from "../config/index.js";
import { adapter } from "./luciaAdapter.js";

interface DatabaseUser {
  id: string;
  username: string;
  github_id: number;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "id">;
  }
}

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: config.env === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      githubId: attributes.github_id,
      username: attributes.username,
    };
  },
});

export const luciaAuthForGithub = new GitHub(
  config.auth_github_oauth_client_id,
  config.auth_github_oauth_client_secret,
  config.auth_github_oauth_redirect_uri,
);
