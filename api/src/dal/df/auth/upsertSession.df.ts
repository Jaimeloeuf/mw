import type { DatabaseSession } from "lucia";

import { json } from "../../../utils/index.js";
import { dataFn } from "../dataFn.js";
import { db } from "./mock-auth-db.js";

export default dataFn(async function authUpsertSession(
  session: DatabaseSession,
) {
  await db.run(
    `
    INSERT INTO sessions (id, user_id, expires_at, attributes)
    VALUES (?, ?, ?, ?)
    ON CONFLICT DO UPDATE SET
      id = excluded.id,
      user_id = excluded.user_id,
      expires_at = excluded.expires_at,
      attributes = excluded.attributes;
  `,
    [
      session.id,
      session.userId,
      session.expiresAt.toISOString(),
      json.stringify(session.attributes),
    ],
  );
});
