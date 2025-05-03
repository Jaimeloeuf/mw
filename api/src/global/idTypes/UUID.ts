declare global {
  /**
   * For UUID strings, generally created using `$UUID.generate()`
   */
  namespace $UUID {
    /**
     * Weak variant, allows implicit string to ID conversion, i.e. can treat
     * strings as a `$UUID.Weak` without any validation and/or type casting.
     */
    type Weak = $WeakStringID<"UUID">;

    /**
     * Strong variant, does not allow implicit string to ID conversion, i.e.
     * cannot treat strings as a `$UUID.Strong` until it is validated and/or
     * type casted, preferably with the utility functions `makeStrongSafely` or
     * `makeStrongAndThrowOnError`.
     */
    type Strong = $StrongStringID<"UUID">;

    /**
     * Utility to generate a new Strong variant UUID.
     */
    function generate(): $UUID.Strong;

    /**
     * Utility to convert a Weak ID variant to Strong ID variant after
     * validation and type casting. This will throw on validation error.
     */
    function makeStrongAndThrowOnError(maybeID: $UUID.Weak): $UUID.Strong;

    /**
     * Utility to convert a Weak ID variant to Strong ID variant after
     * validation and type casting. This will not throw on validation error and
     * instead return a `$ResultTuple`.
     */
    function makeStrongSafely(maybeID: $UUID.Weak): $ResultTuple<$UUID.Strong>;
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
    if (maybeID === "") {
      throw new Error("empty UUID");
    }
    return maybeID as $UUID.Strong;
  },
  makeStrongSafely(maybeID) {
    return [null, this.makeStrongAndThrowOnError(maybeID)];
  },
};
