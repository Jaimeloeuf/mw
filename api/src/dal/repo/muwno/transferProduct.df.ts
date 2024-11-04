import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct, MuwnoOrg } from "../../kysely/index.js";

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
