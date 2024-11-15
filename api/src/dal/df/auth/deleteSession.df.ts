import { dataFn } from "../dataFn.js";
import { sessions } from "./mock-auth-db.js";

export default dataFn(async function authDeleteSession(sessionID: string) {
  sessions.delete(sessionID);
});
