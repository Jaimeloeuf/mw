import { BaseEnt } from "../lib/index.js";

export class EntTemplate extends BaseEnt {
  static override EntTypeID = "__generated_ent_type_id__";

  constructor(
    public data: {
      id: string;
      createdAt: Date;
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

  // @todo Remove this if it is not serialisable
  jsonSerialise(): string {
    return JSON.stringify(this.data);
  }

  // @todo Remove this if it is not serialisable
  // @todo Prefer to use Zod here instead of just JSON.parse
  static override jsonParse(jsonString: string): EntTemplate {
    return new EntTemplate(JSON.parse(jsonString));
  }
}
