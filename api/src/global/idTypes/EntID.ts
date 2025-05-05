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
    type Weak = $WeakStringID<"EntID">;

    /**
     * Strong variant, does not allow implicit string to ID conversion, i.e.
     * cannot treat strings as a `$EntID.Strong` until it is validated and/or
     * type casted, preferably with the utility functions `makeStrongSafely` or
     * `makeStrongAndThrowOnError`.
     */
    type Strong = $StrongStringID<"EntID">;

    /**
     * Utility to generate a new Strong variant EntID.
     *
     * Generate a new ID for a given Ent type using a UUID combined with the
     * `EntTypeID` set on the Ent class itself.
     *
     * EntTypeID is added to the end of the ID to ensure it does not cause indexing
     * issues with storage layers.
     */
    function generate(
      entClass: typeof BaseEnt | EntClass<BaseEnt>,
    ): $EntID.Strong;

    /**
     * Utility to convert a Weak ID variant to Strong ID variant after
     * validation and type casting. This will throw on validation error.
     */
    function makeStrongAndThrowOnError(maybeID: $EntID.Weak): $EntID.Strong;

    /**
     * Utility to convert a Weak ID variant to Strong ID variant after
     * validation and type casting. This will not throw on validation error and
     * instead return a `$ResultTuple`.
     */
    function makeStrongSafely(
      maybeID: $EntID.Weak,
    ): $ResultTuple<$EntID.Strong>;
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
