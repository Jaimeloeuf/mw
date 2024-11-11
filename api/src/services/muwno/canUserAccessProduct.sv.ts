import { df } from "../../__generated/index.js";
import { ForbiddenException } from "../../exceptions/index.js";

/**
 * Validate if a user have access permission to a Product.
 *
 * Throws the common `ForbiddenException` if user does not have access.
 *
 * Treats invalid/non-existent `productID` as Forbidden request.
 */
export default async function (userID: string, productID: string) {
  const canAccess = await df.muwnoCanUserAccessProduct.runAndThrowOnError(
    userID,
    productID,
  );

  if (!canAccess) {
    throw new ForbiddenException(
      `User ${userID} does not have permission to access Product '${productID}'.`,
    );
  }
}
