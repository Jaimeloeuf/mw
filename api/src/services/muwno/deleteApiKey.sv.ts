import { df } from "../../__generated/index.js";
import { default as validateIfUserHaveValidRole } from "./validateIfUserHaveValidRole.sv.js";
import { default as canUserAccessOrg } from "./canUserAccessOrg.sv.js";
import { NotFoundException } from "../../exceptions/index.js";

/**
 * Delete an API Key.
 */
export default async function (requestorID: string, apiKeyID: string) {
  await validateIfUserHaveValidRole(requestorID, ["OrgOwner", "OrgAdmin"]);

  const apiKey = await df.muwnoGetApiKey.getResultOrThrowOnError(apiKeyID);

  if (apiKey === null) {
    throw new NotFoundException(`API Key ${apiKeyID} does not exist.`);
  }

  await canUserAccessOrg(requestorID, apiKey.org_id);

  await df.muwnoDeleteApiKey.getResultOrThrowOnError(apiKey.id);
}
