import { dataFn } from "../dataFn.js";
import { users } from "./mock-auth-db.js";

export default dataFn(async function authCreateUser(
  userID: string,
  githubID: number,
  githubUsername: string,
) {
  users.set(userID, {
    id: userID,
    github_id: githubID,
    username: githubUsername,
  });
});
