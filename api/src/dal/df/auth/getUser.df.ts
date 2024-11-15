import { NotFoundException } from "../../../exceptions/index.js";
import { dataFn } from "../dataFn.js";
import { users } from "./mock-auth-db.js";

export default dataFn(async function authGetUser(userID: string) {
  const user = users.get(userID);

  if (user === undefined) {
    throw new NotFoundException(`Cannot find user '${userID}'`);
  }

  return user;
});
