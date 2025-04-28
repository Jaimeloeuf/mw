import type { BaseEnt } from "./BaseEnt.js";
import type { EntClass } from "./EntClass.js";

/**
 * Verify if the Ent ID is valid for a given Ent Type / Class.
 *
 * Checks:
 * 1. If the entID is exactly 41 characters long, length of UUID + postfix
 * 1. If the entID ends with the correct postfix of "_" and the entTypeID
 */
export function entIdVerify(
  entClass: typeof BaseEnt | EntClass<BaseEnt>,
  entID: string,
): boolean {
  const entTypeID = (entClass as unknown as typeof BaseEnt).EntTypeID;
  return entID.length === 41 && entID.endsWith(`_${entTypeID}`);
}
