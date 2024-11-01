import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct } from "../../kysely/index.js";

export async function getFeedbackResponses(
  productID: MuwnoProduct["id"],
  numberOfResponses: number,
) {
  return apiDB
    .selectFrom("muwno_pmf_survey_response")
    .select(["id", "created_at", "a1", "a2", "a3", "a4"])
    .where("product_id", "=", productID)
    .orderBy("created_at desc")
    .limit(numberOfResponses)
    .execute();
}
