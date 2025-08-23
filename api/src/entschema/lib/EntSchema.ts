// import type { Database } from "../../dal/index.js";

import type { EntEdgeDefinition } from "./EntEdgeDefinition.js";
import type { EntFieldDefinition } from "./EntFieldDefinition.js";
import type { EntSchemaClass } from "./EntSchemaClass.js";

import { EntSchemaValidateAndSetup } from "./EntSchemaValidateAndSetup.js";

export abstract class EntSchema {
  /**
   * Validate the current schema and set it up to use the validated data object.
   */
  static validateAndSetup() {
    // @ts-expect-error since `EntSchema` is an abstract class, the only way
    // this static method can be invoked is via a concrete class, so it can be
    // safely assumed that it will be a concrete class here
    return EntSchemaValidateAndSetup(this as EntSchemaClass);
  }

  abstract EntTypeID: string;

  // @todo To implement stricter typing or perhaps do runtime validation instead
  // abstract EntDbTable: keyof Database;
  abstract EntDbTable: string;

  abstract getFieldConfigs(): Array<EntFieldDefinition>;

  abstract getEdgeConfigs(): Array<EntEdgeDefinition>;
}
