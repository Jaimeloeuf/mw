import { BaseEnt } from "../lib/index.js";

export class EntTemplate extends BaseEnt {
  static override EntTypeID = "__generated_ent_type_id__";

  constructor(
    public readonly data: {
      readonly id: string;
      readonly createdAt: Date;
      updatedAt: Date;

      // @todo
      // Define your Ent's data fields after this line. You can use JSDocs on
      // the properties here and it will be available in your product code.
      // /**
      //  * E.g. This is the name of ...
      //  */
      // name: string;
    },
  ) {
    super();
  }

  /**
   * @todo
   * Implement this yourself using Zod instead of just `JSON.parse` or delete
   * this method if not needed.
   */
  // static override jsonParseAndValidate(jsonString: string) {
  //   return new EntTemplate(...);
  // }
}
