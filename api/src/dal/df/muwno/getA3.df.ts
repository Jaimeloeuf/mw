import type {
  MuwnoProduct,
  MuwnoPmfSurveyResponse,
} from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Get Product's feedback response `a3`.
 * @todo Use a better name for this to not conflict with other data functions
 */
export default dataFn(async function getA3(
  productID: MuwnoProduct["id"],
  take: number,
  optionalPaginationID?: MuwnoPmfSurveyResponse["id"],
) {
  let query = apiDB
    .selectFrom("muwno_pmf_survey_response")
    .select(["id", "a3"])
    .where("product_id", "=", productID)
    .where("a3", "!=", "")
    .limit(take)

    // Sort by importance and newest first.
    .orderBy("a1 desc")
    .orderBy("created_at desc");

  if (optionalPaginationID !== undefined) {
    query = query;

    // @todo Figure out how to do pagination
    // Since ID is not k sortable, we need to cursor by timestamp instead?
    // Unless our IDs are ULID which is k sortable?
    // query = query
    //   .orderBy("id desc")
    //   .where("id", "<", optionalPaginationID)

    //   // Skip the cursor (1 row)
    //   .offset(1);
  }

  return query.execute();
});
