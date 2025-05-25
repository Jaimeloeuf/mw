import { BaseEnt } from "../../ent/index.js";

export class EntJohari extends BaseEnt {
  static override EntTypeID = "4f51";

  constructor(
    public readonly data: {
      readonly id: string;
      readonly createdAt: $DateTime.ISO.DateTime.Strong;
      updatedAt: $DateTime.ISO.DateTime.Strong;

      /**
       * Name of the user this Johari belongs to
       */
      name: string;

      /**
       * Words that the user selected for themselves
       */
      words: string;
    },
  ) {
    super();
  }
}
