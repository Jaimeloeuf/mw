import type { BaseEnt } from "./BaseEnt.js";
import type { EntClass } from "./EntClass.js";

/**
 * Verify if the Ent ID is valid for a given Ent Type / Class.
 */
export function entIdVerify(
  entClass: typeof BaseEnt | EntClass<BaseEnt>,
  entID: string,
): boolean {
  const entTypeID = (entClass as unknown as typeof BaseEnt).EntTypeID;
  // By hardcoding 41, we can also ensure that the ID is of the right length,
  // and not just an arbitrary length string that happens to end with EntTypeID.
  return entID.endsWith(`_${entTypeID}`, 41);
}
