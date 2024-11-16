import { dataFn } from "../dataFn.js";
import { db } from "./mock-auth-db.js";

export default dataFn(async function authDeleteSession(sessionID: string) {
  await db.run(`DELETE FROM sessions WHERE id = ?`, [sessionID]);
});
