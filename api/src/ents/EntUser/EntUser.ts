import { BaseEnt } from "../../ent/index.js";

export class EntUser extends BaseEnt {
  static override EntTypeID = "48fi";

  constructor(
    public readonly data: {
      readonly id: string;
      readonly createdAt: Date;
      updatedAt: Date;

      /**
       * The user's full name
       */
      name: string;

      /**
       * The user's main email address tied to this account
       */
      email: string;

      /**
       * Is the user account deactivated?
       */
      deactivated: boolean;
    },
  ) {
    super();
  }
}
