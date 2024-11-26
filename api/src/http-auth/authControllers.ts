import type { User, Session } from "lucia";

import { OAuth2RequestError, generateState } from "arctic";
import { Router } from "express";
import { verifyRequestOrigin } from "lucia";
import { generateId } from "lucia";
import { parseCookies, serializeCookie } from "oslo/cookie";

import { df } from "../__generated/index.js";
import { config } from "../config/index.js";
import { logger } from "../logging/index.js";
import { GitHubUser } from "./GitHubUser.js";
import { luciaAuthForGithub, lucia } from "./luciaAuth.js";

declare global {
  namespace Express {
    interface Locals {
      user: User | null;
      session: Session | null;
    }
  }
}

export function authControllers() {
  const r = Router();

  // Auth middleware
  r.use((req, res, next) => {
    if (req.method === "GET") {
      return next();
    }
    const originHeader = req.headers.origin;
    const hostHeader = req.headers.host;
    if (
      originHeader === undefined ||
      hostHeader === undefined ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return res.status(403).end();
    }
    return next();
  });

  // Auth middleware
  r.use(async (req, res, next) => {
    const sessionID = lucia.readSessionCookie(req.headers.cookie ?? "");
    if (sessionID === null) {
      res.locals["user"] = null;
      res.locals["session"] = null;
      return next();
    }

    const { session, user } = await lucia.validateSession(sessionID);

    if (session?.fresh) {
      res.appendHeader(
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize(),
      );
    } else if (session === null) {
      res.appendHeader(
        "Set-Cookie",
        lucia.createBlankSessionCookie().serialize(),
      );
    }

    res.locals["session"] = session;
    res.locals["user"] = user;
    return next();
  });

  // Main login page
  r.get("/login", async function (_req, res, _next) {
    // If user is logged in
    if (res.locals["session"]) {
      // Should have a query param for redirect after login to know what app to load
      return res.redirect("/auth/login/complete");
    }

    res.status(200).send(`<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
		<title>mw auth</title>
	</head>
	<body>
		<h1>Login</h1>
		<a href="/auth/login/oauth/github">GitHub OAuth</a>
	</body>
</html>`);
  });

  // Visit this link to redirect to github for login
  r.get("/login/oauth/github", async function (_req, res, _next) {
    const githubOauthState = generateState();
    const githubLoginUrl = await luciaAuthForGithub.createAuthorizationURL(
      githubOauthState,
      [],
    );

    res
      .appendHeader(
        "Set-Cookie",
        serializeCookie("github_oauth_state", githubOauthState, {
          path: "/",
          secure: config.env() === "production",
          httpOnly: true,
          maxAge: 60 * 10,
          sameSite: "lax",
        }),
      )
      .redirect(githubLoginUrl.toString());
  });

  // Get redirected back here from github after successful github login
  r.get("/login/oauth/github/callback", async (req, res) => {
    const code = req.query["code"]?.toString() ?? null;
    const state = req.query["state"]?.toString() ?? null;
    const storedState =
      parseCookies(req.headers.cookie ?? "").get("github_oauth_state") ?? null;

    if (!code || !state || !storedState || state !== storedState) {
      logger.info(
        `Github OAuth login callback`,
        `Login failed for code '${code}', state '${state}', storedState '${storedState}'`,
      );
      res.status(400).end();
      return;
    }

    try {
      const tokens = await luciaAuthForGithub.validateAuthorizationCode(code);
      const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken()}`,
        },
      });

      const githubUser: GitHubUser = await githubUserResponse.json();

      const [getUserWithGithubIDError, existingUser] =
        await df.authGetUserWithGithubID.run(githubUser.id);

      // User does not exist, create a new one
      if (getUserWithGithubIDError !== null) {
        const userID = generateId(15);

        await df.authCreateUser.runAndThrowOnError(
          userID,
          githubUser.id,
          githubUser.login,
        );

        const session = await lucia.createSession(userID, {});

        return res
          .appendHeader(
            "Set-Cookie",
            lucia.createSessionCookie(session.id).serialize(),
          )
          .redirect("/auth/login/complete");
      }

      // User exists, create session and redirect
      const session = await lucia.createSession(existingUser.id, {});

      return res
        .appendHeader(
          "Set-Cookie",
          lucia.createSessionCookie(session.id).serialize(),
        )
        .redirect("/auth/login/complete");
    } catch (e) {
      if (
        e instanceof OAuth2RequestError &&
        e?.code === "bad_verification_code"
      ) {
        res.status(400);
      } else {
        res.status(500);
      }

      logger.error("Github OAuth login callback", "Failed to login", e);

      res.redirect("/auth/login?failed");
    }
  });

  r.get("/login/complete", async (_req, res) => {
    if (!res.locals["user"]) {
      return res.redirect("/auth/login");
    }

    res.status(200).send(
      `<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
		<title>mw auth</title>
	</head>
	<body>
		<h1>You are now logged in! Redirecting you to ...</h1>
    <p>Github username: ${res.locals["user"].username}</p>
    <p>UserID: ${res.locals["user"].id}</p>
		<button onclick="fetch('/auth/logout', { method: 'POST' }).then(res => res.text()).then(loc => (window.location=loc))">Logout</a>
	</body>
</html>`,
    );
  });

  r.post("/logout", async (_req, res) => {
    if (!res.locals["session"]) {
      return res.status(401).end();
    }

    await lucia.invalidateSession(res.locals["session"].id);

    return (
      res
        .setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize())

        // If user called this endpoint as an API call instead of a redirect,
        // send the URL string back for them to redirect to manually.
        .send("/auth/login")

        // If user called this endpoint as a redirect/navigation, redirect back
        // to the login page directly.
        .redirect("/auth/login")
    );
  });

  return r;
}
