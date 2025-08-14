import type { BaseEnt } from "../../ent/BaseEnt.js";
import type { EntClass } from "../../ent/EntClass.js";

import { ValidationFailedException } from "../../exceptions/ValidationFailedException.js";

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
     *
     * If `entClass` is passed in, this will also validate if the given ID is an
     * EntID of that EntClass.
     *
     * Note that this validation only cares about whether the "shape" of the ID
     * is correct, and doesnt actually check whether the ID points to an object
     * that exists, since a newly generated ID is also a valid EntID.
     */
    function makeStrongAndThrowOnError(maybeID: Weak): Strong;
    function makeStrongAndThrowOnError(
      maybeID: Weak,
      entClass: typeof BaseEnt | EntClass<BaseEnt>,
    ): Strong;

    /**
     * Utility to convert a Weak ID variant to Strong ID variant after
     * validation and type casting. This will not throw on validation error and
     * instead return a `$ResultTuple`.
     */
    function makeStrongSafely(maybeID: Weak): $ResultTuple<Strong>;
  }
}

/**
 * Utility function to get validation exception message that is customised
 * depending on whether `entClass` is provided.
 */
const getValidationExceptionMessage = (
  maybeID: string,
  entClass?: typeof BaseEnt | EntClass<BaseEnt>,
) =>
  `Invalid ID '${maybeID}'` +
  (entClass === undefined ? "" : ` used for '${entClass.name}'`);

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
  makeStrongAndThrowOnError(
    maybeID,
    entClass?: typeof BaseEnt | EntClass<BaseEnt>,
  ) {
    const maybeIdComponents = maybeID.split("_");
    if (maybeIdComponents.length !== 2) {
      throw new ValidationFailedException(
        getValidationExceptionMessage(maybeID, entClass),
      );
    }

    const [maybeUUID, maybeEntTypeID] = maybeIdComponents as [string, string];

    const [uuidException] = $UUID.makeStrongSafely(maybeUUID);
    if (uuidException !== null) {
      throw new ValidationFailedException(
        getValidationExceptionMessage(maybeID, entClass),
        [uuidException.message],
      );
    }

    // If entClass is specified, verify that the given ID matches the given
    // entClass's EntTypeID.
    if (entClass !== undefined) {
      if (maybeEntTypeID !== (entClass as typeof BaseEnt).EntTypeID) {
        throw new ValidationFailedException(
          getValidationExceptionMessage(maybeID, entClass),
          [`Invalid EntTypeID: ${maybeEntTypeID}`],
        );
      }
    }

    return maybeID as $EntID.Strong;
  },
  makeStrongSafely(maybeID) {
    return [null, this.makeStrongAndThrowOnError(maybeID)];
  },
};
