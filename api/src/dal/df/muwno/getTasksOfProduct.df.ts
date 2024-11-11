import type {
  MuwnoProduct,
  MuwnoPmfSurveyResponse,
} from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(async function muwnoGetTasksOfProduct(
  productID: MuwnoProduct["id"],
  take: number,
  optionalPaginationID?: MuwnoPmfSurveyResponse["id"],
) {
  let query = apiDB
    .selectFrom("muwno_task")
    .selectAll()
    .limit(take)
    .where("product_id", "=", productID)

    // Get all non completed tasks
    .where("done", "=", false)

    // Sort by importance and oldest first.
    .orderBy("score desc")
    .orderBy("created_at asc");

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
