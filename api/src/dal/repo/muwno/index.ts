import { dalWrapper } from "../dalWrapper.js";

import { getUser } from "./getUser.js";

export const muwnoRepo = {
  /**
   * Get User Entity object, throws `NotFoundException` if not found.
   */
  getUser: dalWrapper(getUser),
};
