import { sv, df } from "../../__generated/index.js";
import { NotFoundException } from "../../exceptions/index.js";

/**
 * Delete an API Key.
 */
export default async function (requestorID: string, apiKeyID: string) {
  await sv.muwnoValidateIfUserHaveValidRole(requestorID, [
    "OrgOwner",
    "OrgAdmin",
  ]);

  const apiKey = await df.muwnoGetApiKey.getResultOrThrowOnError(apiKeyID);

  if (apiKey === null) {
    throw new NotFoundException(`API Key ${apiKeyID} does not exist.`);
  }

  await sv.muwnoCanUserAccessOrg(requestorID, apiKey.org_id);

  await df.muwnoDeleteApiKey.getResultOrThrowOnError(apiKey.id);
}
