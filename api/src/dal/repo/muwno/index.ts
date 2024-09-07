import { dalWrapper } from "../dalWrapper.js";

import { getUser } from "./getUser.js";
import { createUser } from "./createUser.js";
import { updateUser } from "./updateUser.js";
import { isUserOnboarded } from "./isUserOnboarded.js";

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
   * Check if given user completed onboarding.
   *
   * To be considered onboarded
   * 1. User must have an Org
   * 2. The org must have a valid subscription
   */
  isUserOnboarded: dalWrapper(isUserOnboarded),
};
