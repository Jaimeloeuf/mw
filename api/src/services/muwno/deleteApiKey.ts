import { df } from "../../__generated/index.js";
import { validateIfUserHaveValidRole } from "./validateIfUserHaveValidRole.js";
import { canUserAccessOrg } from "./canUserAccessOrg.js";
import { NotFoundException } from "../../exceptions/index.js";

/**
 * Delete an API Key.
 */
export async function deleteApiKey(requestorID: string, apiKeyID: string) {
  await validateIfUserHaveValidRole(requestorID, ["OrgOwner", "OrgAdmin"]);

  const apiKey = await df.getApiKey.getResultOrThrowOnError(apiKeyID);

  if (apiKey === null) {
    throw new NotFoundException(`API Key ${apiKeyID} does not exist.`);
  }

  await canUserAccessOrg(requestorID, apiKey.org_id);

  await df.deleteApiKey.getResultOrThrowOnError(apiKey.id);
}
