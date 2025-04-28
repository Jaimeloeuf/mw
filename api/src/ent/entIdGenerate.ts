import type { BaseEnt } from "./BaseEnt.js";
import type { EntClass } from "./EntClass.js";

/**
 * Generate a new ID for a given Ent type using a UUID combined with the
 * `EntTypeID` set on the Ent class itself.
 *
 * EntTypeID is added to the end of the ID to ensure it does not cause indexing
 * issues with storage layers.
 */
export function entIdGenerate(
  entClass: typeof BaseEnt | EntClass<BaseEnt>,
): string {
  // Casting to get the value of the non-abstract class
  const entTypeID = (entClass as unknown as typeof BaseEnt).EntTypeID;
  const uuid = crypto.randomUUID();
  return `${uuid}_${entTypeID}`;
}
