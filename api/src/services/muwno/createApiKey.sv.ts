import { randomBytes } from "crypto";

import { df } from "../../__generated/index.js";
import { InvalidOperationException } from "../../exceptions/index.js";
import { sha256hash } from "../../utils/index.js";

/**
 * Create a new API Key for user's Org.
 */
export default async function (requestorID: string) {
  const user = await df.muwnoGetUser.runAndThrowOnError(requestorID);

  if (user.org_id === null) {
    throw new InvalidOperationException(
      `User '${user.id}' cannot create API key as they do not belong to any org.`,
    );
  }

  const key = "sk:" + randomBytes(32).toString("base64url");
  const hash = sha256hash(key);
  const prefix = key.slice(0, 6);

  const apiKey = await df.muwnoCreateApiKey.runAndThrowOnError({
    created_at: $DateTime.now.asIsoDateTime(),
    org_id: user.org_id,
    created_by: `${user.name} <${user.email}>`,
    hash,
    prefix,
  });

  // Return the original raw key to users too so that they can see it once.
  return {
    ...apiKey,
    key,
  };
}
