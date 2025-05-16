import { ValidationFailedException } from "../../exceptions/ValidationFailedException.js";

declare global {
  /**
   * For UUID strings, generally created using `$UUID.generate()`
   */
  namespace $UUID {
    /**
     * Weak variant, allows implicit string to ID conversion, i.e. can treat
     * strings as a `$UUID.Weak` without any validation and/or type casting.
     */
    type Weak = $MakeFlavoredString<"UUID">;

    /**
     * Strong variant, does not allow implicit string to ID conversion, i.e.
     * cannot treat strings as a `$UUID.Strong` until it is validated and/or
     * type casted, preferably with the utility functions `makeStrongSafely` or
     * `makeStrongAndThrowOnError`.
     */
    type Strong = $MakeBrandedString<"UUID">;

    /**
     * Utility to generate a new Strong variant UUID.
     */
    function generate(): Strong;

    /**
     * Utility to convert a Weak ID variant to Strong ID variant after
     * validation and type casting. This will throw on validation error.
     *
     * ## Important
     * For performance reason, this only validate if the maybeID string is 36
     * characters long, and does not actually check if it is a valid UUID since
     * doing the validation with regex is too slow for the amount of calls to
     * this function.
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
 * Define utilities for the $UUID type in global scope after the ambient
 * namespace definitions.
 */
globalThis.$UUID = {
  generate() {
    // eslint-disable-next-line no-restricted-properties
    return crypto.randomUUID() as $UUID.Strong;
  },
  makeStrongAndThrowOnError(maybeID) {
    if (maybeID.length !== 36) {
      throw new ValidationFailedException(`Invalid UUID: ${maybeID}`);
    }
    return maybeID as $UUID.Strong;
  },
  makeStrongSafely(maybeID) {
    return $runFnSafely(this.makeStrongAndThrowOnError, maybeID);
  },
};
