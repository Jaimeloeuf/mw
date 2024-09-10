import { dalWrapper } from "../dalWrapper.js";

import { getUser } from "./getUser.js";
import { createUser } from "./createUser.js";
import { updateUser } from "./updateUser.js";
import { deactivateUser } from "./deactivateUser.js";
import { isUserOnboarded } from "./isUserOnboarded.js";
import { canUserAccessOrg } from "./canUserAccessOrg.js";
import { getOrg } from "./getOrg.js";
import { getOrgOfUser } from "./getOrgOfUser.js";
import { createOrg } from "./createOrg.js";
import { updateOrg } from "./updateOrg.js";
import { canUserAccessProduct } from "./canUserAccessProduct.js";
import { getProduct } from "./getProduct.js";
import { getProductOrgID } from "./getProductOrgID.js";

export const muwnoRepo = {
  /**
   * Get User Entity object, throws `NotFoundException` if not found.
   */
  getUser: dalWrapper(getUser),

  /**
   * Create a new User in data source
   */
  createUser: dalWrapper(createUser),

  /**
   * Update a User in data source
   */
  updateUser: dalWrapper(updateUser),

  /**
   * Deactivate a User account
   */
  deactivateUser: dalWrapper(deactivateUser),

  /**
   * Check if given user completed onboarding.
   *
   * To be considered onboarded
   * 1. User must have an Org
   * 2. The org must have a valid subscription
   */
  isUserOnboarded: dalWrapper(isUserOnboarded),

  /**
   * Check if user have access permission to this Org.
   */
  canUserAccessOrg: dalWrapper(canUserAccessOrg),

  /**
   * Get a single Org Entity object back
   */
  getOrg: dalWrapper(getOrg),

  /**
   * Get a user's Org Entity object back if they belong to an Org
   */
  getOrgOfUser: dalWrapper(getOrgOfUser),

  /**
   * Create a new Organisation in data source
   */
  createOrg: dalWrapper(createOrg),

  /**
   * Update an Organisation in data source
   */
  updateOrg: dalWrapper(updateOrg),

  /**
   * Check if user have access permission to this product.
   * If product does not exists, it is also treated as a lack of permission.
   */
  canUserAccessProduct: dalWrapper(canUserAccessProduct),

  /**
   * Get a single product the user can access.
   */
  getProduct: dalWrapper(getProduct),

  /**
   * Get a product's Org ID.
   */
  getProductOrgID: dalWrapper(getProductOrgID),
};
