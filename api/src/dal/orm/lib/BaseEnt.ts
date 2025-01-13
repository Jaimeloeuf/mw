import type { EntManagedData } from "./EntManagedData.js";
import type { EntSupportedData } from "./EntSupportedData.js";

import { UnimplementedException } from "../../../exceptions/index.js";

/**
 * Base abstract Entity class for all Ents to extend.
 *
 * Product Users should always interact with the Ent using the Operators and
 * SHOULD NOT interact with the Ent using the constructor directly.
 */
export abstract class BaseEnt<
  DataType extends EntSupportedData = EntSupportedData,
> {
  /**
   * ID to uniquely identify every Ent Type, and will be used as all the Ent
   * instance's ID prefix.
   *
   * 4 character alphanumeric [a-z, 0-9] string for ~1.5 million unique IDs.
   *
   * This will allow us to quickly identify what is the Ent Type by looking at
   * the Ent instance ID.
   */
  static EntTypeID: string;

  /**
   * The Ent's data
   */
  abstract data: EntManagedData & DataType;

  get id(): string {
    return this.data.id;
  }

  /**
   * This method provides a consistent way for sending the data over the network
   * using JSON. This also means that all data in an Ent should use primitive
   * types that are JSON serializable.
   *
   * Override this if you do not want to use the default `JSON.stringify`
   * serialisation method.
   */
  jsonSerialise(): string {
    return JSON.stringify(this.data);
  }

  /**
   * Recommended to use `zod` instead of parsing with `JSON.parse`.
   */
  static jsonParse(jsonString: string): unknown {
    throw new UnimplementedException(
      `jsonParse not implemented! Cannot parse: ${jsonString}`,
    );
  }
}
