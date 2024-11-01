import { apiDB } from "../../kysely/index.js";
import type { MuwnoOrg } from "../../kysely/index.js";
import { ServiceException } from "../../../exceptions/index.js";

export async function getNumberOfFeedbackResponsesStoredByOrg(
  orgID: MuwnoOrg["id"],
) {
  const productIDs = await apiDB
    .selectFrom("muwno_product")
    .select("id")
    .where("org_id", "=", orgID)
    .execute()
    .then((products) => products.map((product) => product.id));

  const count = await apiDB
    .selectFrom("muwno_pmf_survey_response")
    .select((eb) =>
      eb.fn
        .count<number>("id")
        .filterWhere("product_id", "in", productIDs)
        .as("number_of_responses_stored"),
    )
    .executeTakeFirst()
    .then((value) => value?.number_of_responses_stored);

  if (count === undefined) {
    throw new ServiceException(
      `Failed to count number of feedback form responses stored for org '${orgID}'`,
    );
  }

  return count;
}
