import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct } from "../../kysely/index.js";

/**
 * Get feedback response data `a3` of the given productID, which is the answer
 * for "Main benefit of Product", sorted by most important and oldest first, and
 * up to the first 1000 answers.
 */
export default dataFn(async function getFeedbackResponseA3(
  productID: MuwnoProduct["id"],
  timeRange: number,
) {
  let query = apiDB
    .selectFrom("muwno_pmf_survey_response")
    .select("a3")
    .where("product_id", "=", productID)
    .where("a3", "!=", "")

    // Sort by importance and oldest first.
    .orderBy("a1 desc")
    .orderBy("created_at asc")

    // Up to 500 (arbitrary hardcoded limit) responses
    .limit(500);

  // If time range specified, use it to filter for range between
  // (today - timeRange seconds) --> today
  if (timeRange !== 0) {
    // @todo Figure out how to do pagination
    query = query;
    // query = query.where(
    //   "created_at",
    //   ">",
    //   Math.trunc(Date.now() / 1000) - timeRange,
    // );
  }

  return query
    .execute()
    .then((responses) => responses.map((response) => response.a3));
});
