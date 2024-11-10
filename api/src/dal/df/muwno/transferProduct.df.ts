import type { MuwnoProduct, MuwnoOrg } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

/**
 * Transfer product to a different Org.
 */
export default dataFn(function transferProduct(
  productID: MuwnoProduct["id"],
  newOrgID: MuwnoOrg["id"],
) {
  return apiDB
    .updateTable("muwno_product")
    .set({
      org_id: newOrgID,
    })
    .where("id", "=", productID)
    .execute();
});
