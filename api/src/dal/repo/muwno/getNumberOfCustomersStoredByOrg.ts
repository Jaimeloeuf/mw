import { apiDB } from "../../kysely/index.js";
import type { MuwnoOrg } from "../../kysely/index.js";
import { ServiceException } from "../../../exceptions/index.js";

export async function getNumberOfCustomersStoredByOrg(orgID: MuwnoOrg["id"]) {
  const number_of_customers_stored = await apiDB
    .selectFrom("muwno_customer")
    .select((eb) =>
      eb.fn
        .count<number>("id")
        .filterWhere("org_id", "=", orgID)
        .as("number_of_customers_stored"),
    )
    .executeTakeFirst()
    .then((value) => value?.number_of_customers_stored);

  if (number_of_customers_stored === undefined) {
    throw new ServiceException(
      `Failed to count number of customers stored for org '${orgID}'`,
    );
  }

  return number_of_customers_stored;
}
