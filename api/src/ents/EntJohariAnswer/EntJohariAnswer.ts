import { BaseEnt } from "../../ent/index.js";

export class EntJohariAnswer extends BaseEnt {
  static override EntTypeID = "90f3";

  constructor(
    public readonly data: {
      readonly id: string;
      readonly createdAt: Date;
      updatedAt: Date;

      /**
       * ID of the Johari this answer is for
       */
      johariID: string;

      /**
       * Name of the user that answered
       */
      name: string;

      /**
       * Words that the user selected
       */
      words: string;
    },
  ) {
    super();
  }
}
