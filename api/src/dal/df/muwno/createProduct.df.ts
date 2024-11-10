import type { CreateMuwnoProduct } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";
import { injectID, OptionalID } from "../injectID.js";

export default dataFn(function createProduct(
  product: OptionalID<CreateMuwnoProduct>,
) {
  return apiDB
    .insertInto("muwno_product")
    .values(injectID(product))
    .returningAll()
    .executeTakeFirstOrThrow();
});
