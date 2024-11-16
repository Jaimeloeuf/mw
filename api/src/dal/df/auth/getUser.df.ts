import type { DatabaseUser } from "./mock-auth-db.js";

import { NotFoundException } from "../../../exceptions/index.js";
import { dataFn } from "../dataFn.js";
import { db } from "./mock-auth-db.js";

export default dataFn(async function authGetUser(userID: string) {
  const user = await db.get<DatabaseUser>(`SELECT * FROM users WHERE id = ?;`, [
    userID,
  ]);

  if (user === undefined) {
    throw new NotFoundException(`Cannot find user '${userID}'`);
  }

  return user;
});
