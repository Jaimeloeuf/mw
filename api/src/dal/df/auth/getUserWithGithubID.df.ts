import type { DatabaseUser } from "./mock-auth-db.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { dataFn } from "../dataFn.js";
import { db } from "./mock-auth-db.js";

export default dataFn(async function authGetUserWithGithubID(githubID: number) {
  const user = await db.get<DatabaseUser>(
    `SELECT * FROM users WHERE github_id = ?;`,
    [githubID],
  );

  if (user === undefined) {
    throw new NotFoundException(
      `Cannot find user with github ID '${githubID}'`,
    );
  }

  return user;
});
