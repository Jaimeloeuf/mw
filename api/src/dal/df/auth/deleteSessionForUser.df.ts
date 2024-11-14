import { dataFn } from "../dataFn.js";
import { userToSession } from "./mock-auth-db.js";

export default dataFn(function authDeleteSessionForUser(userID: string) {
  userToSession.delete(userID);
});
