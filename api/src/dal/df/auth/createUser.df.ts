import { dataFn } from "../dataFn.js";
import { db } from "./mock-auth-db.js";

export default dataFn(async function authCreateUser(
  userID: string,
  githubID: number,
  githubUsername: string,
) {
  await db.run(`INSERT INTO users (id, username, github_id) VALUES (?, ?, ?)`, [
    userID,
    githubUsername,
    githubID,
  ]);
});
