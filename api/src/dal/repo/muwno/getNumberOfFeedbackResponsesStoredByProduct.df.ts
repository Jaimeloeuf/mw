import { dataFn } from "../dataFn.js";
import { apiDB } from "../../kysely/index.js";
import type { MuwnoProduct } from "../../kysely/index.js";
import { ServiceException } from "../../../exceptions/index.js";

/**
 * Get the number of survey responses currently stored for a given Product.
 */
export default dataFn(
  async function getNumberOfFeedbackResponsesStoredByProduct(
    productID: MuwnoProduct["id"],
  ) {
    const count = await apiDB
      .selectFrom("muwno_pmf_survey_response")
      .select((eb) =>
        eb.fn
          .count<number>("id")
          .filterWhere("product_id", "=", productID)
          .as("number_of_responses_stored"),
      )
      .executeTakeFirst()
      .then((value) => value?.number_of_responses_stored);

    if (count === undefined) {
      throw new ServiceException(
        `Failed to count number of feedback form responses stored for product '${productID}'`,
      );
    }

    return count;
  },
);
