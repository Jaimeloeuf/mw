import { dataFn } from "../dataFn.js";
import { db } from "./mock-auth-db.js";

export default dataFn(async function authDeleteSessionForUser(userID: string) {
  await db.run(`DELETE FROM sessions WHERE user_id = ?`, [userID]);
});
