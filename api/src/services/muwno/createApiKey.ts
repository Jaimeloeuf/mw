import { ulid } from "ulid";
import { randomBytes } from "crypto";
import { muwnoRepo } from "../../dal/index.js";
import { sha256hash } from "../../utils/index.js";
import { InvalidOperationException } from "../../exceptions/index.js";

/**
 * Create a new API Key for user's Org.
 */
export async function createApiKey(requestorID: string) {
  const user = await muwnoRepo.getUser.getResultOrThrowOnError(requestorID);

  if (user.org_id === null) {
    throw new InvalidOperationException(
      `User '${user.id}' cannot create API key as they do not belong to any org.`,
    );
  }

  const key = "sk:" + randomBytes(32).toString("base64url");
  const hash = sha256hash(key);
  const prefix = key.slice(0, 6);

  const apiKey = await muwnoRepo.createApiKey.getResultOrThrowOnError({
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
