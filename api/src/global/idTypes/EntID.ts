import type { BaseEnt } from "../../ent/BaseEnt.js";
import type { EntClass } from "../../ent/EntClass.js";

declare global {
  /**
   * For EntID strings, generally created using `$EntID.generate()`
   */
  namespace $EntID {
    /**
     * Weak variant, allows implicit string to ID conversion, i.e. can treat
     * strings as a `$EntID.Weak` without any validation and/or type casting.
     */
    type Weak = $MakeFlavoredString<"EntID">;

    /**
     * Strong variant, does not allow implicit string to ID conversion, i.e.
     * cannot treat strings as a `$EntID.Strong` until it is validated and/or
     * type casted, preferably with the utility functions `makeStrongSafely` or
     * `makeStrongAndThrowOnError`.
     */
    type Strong = $MakeBrandedString<"EntID">;

    /**
     * Utility to generate a new Strong variant EntID.
     *
     * Generate a new ID for a given Ent type using a UUID combined with the
     * `EntTypeID` set on the Ent class itself.
     *
     * EntTypeID is added to the end of the ID to ensure it does not cause indexing
     * issues with storage layers.
     */
    function generate(entClass: typeof BaseEnt | EntClass<BaseEnt>): Strong;

    /**
     * Checks if the Ent ID is valid for a given Ent Type / Class.
     *
     * Checks:
     * 1. If the entID is exactly 41 characters long, length of UUID + postfix
     * 1. If the entID ends with the correct postfix of "_" and the entTypeID
     */
    function isValid(
      entClass: typeof BaseEnt | EntClass<BaseEnt>,
      maybeID: string,
    ): boolean;

    /**
     * Utility to convert a Weak ID variant to Strong ID variant after
     * validation and type casting. This will throw on validation error.
     */
    function makeStrongAndThrowOnError(maybeID: Weak): Strong;

    /**
     * Utility to convert a Weak ID variant to Strong ID variant after
     * validation and type casting. This will not throw on validation error and
     * instead return a `$ResultTuple`.
     */
    function makeStrongSafely(maybeID: Weak): $ResultTuple<Strong>;
  }
}

/**
 * Define utilities for the $EntID type in global scope after the ambient
 * namespace definitions.
 */
globalThis.$EntID = {
  generate(entClass) {
    // Casting entClass to get the value of the non-abstract class
    return `${$UUID.generate()}_${(entClass as typeof BaseEnt).EntTypeID}` as $EntID.Strong;
  },
  isValid(entClass, maybeID) {
    return (
      maybeID.length === 41 &&
      maybeID.endsWith(`_${(entClass as typeof BaseEnt).EntTypeID}`)
    );
  },
  makeStrongAndThrowOnError(maybeID) {
    if (maybeID === "") {
      throw new Error("Empty EntID");
    }
    return maybeID as $EntID.Strong;
  },
  makeStrongSafely(maybeID) {
    return [null, this.makeStrongAndThrowOnError(maybeID)];
  },
};
