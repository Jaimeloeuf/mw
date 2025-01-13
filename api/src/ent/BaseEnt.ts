import type { EntClass } from "./EntClass.js";
import type { EntManagedData } from "./EntManagedData.js";
import type { EntSupportedData } from "./EntSupportedData.js";

import { UnimplementedException } from "../exceptions/index.js";

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
  abstract readonly data: EntManagedData & DataType;

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
   * This static method allows you to create a new instance of your Ent from a
   * JSON string. However this is not always recommended as this uses
   * `JSON.parse` directly and feeds the result to the Ent constructor directly
   * without any validation.
   *
   * If you would like to have validation and other safer parse options, you
   * can override the static `jsonParseAndValidate` method and use that instead.
   */
  static jsonParse<Ent extends BaseEnt>(
    this: EntClass<Ent>,
    jsonString: string,
  ): Ent {
    return new this(JSON.parse(jsonString));
  }

  /**
   * Override this method to implement a `JSON.parse` and validate feature for
   * your Ent, preferrably using something like `zod` instead of parsing with
   * `JSON.parse`.
   *
   * This will throw `UnimplementedException` if you tried to use it without
   * overriding it.
   */
  static jsonParseAndValidate(jsonString: string) {
    throw new UnimplementedException(
      `${BaseEnt.jsonParseAndValidate.name} not implemented! Cannot parse: ${jsonString}`,
    );
  }
}
