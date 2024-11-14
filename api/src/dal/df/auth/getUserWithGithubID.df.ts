import { NotFoundException } from "../../../exceptions/index.js";
import { dataFn } from "../dataFn.js";
import { users } from "./mock-auth-db.js";

export default dataFn(function authGetUserWithGithubID(githubID: number) {
  for (const user of users.values()) {
    if (user.github_id === githubID) {
      return user;
    }
  }

  throw new NotFoundException(`Cannot find user with github ID '${githubID}'`);
});
