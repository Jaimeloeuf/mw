/**
 * Defines all the common ID types in the codebase.
 *
 * Note that these are not just type aliases to primitive types (string/number),
 * instead these are Strong and Weak ID types made using `Branding` and
 * `Flavoring`.
 *
 * Every ID type has a Weak and Strong variant.
 *
 * Declaring all globally available utility types here with a $ prefix to
 * signify that these are in the global scope.
 */
declare global {
  /**
   * For UUID strings, generally created using `crypto.randomUUID()`
   */
  type $WeakUUID = $WeakStringID<"UUID">;

  /**
   * For UUID strings, generally created using `crypto.randomUUID()`
   */
  type $StrongUUID = $StrongStringID<"UUID">;

  /**
   * EntID strings
   */
  type $WeakEntID = $WeakStringID<"EntID">;

  /**
   * EntID strings
   */
  type $StrongEntID = $StrongStringID<"EntID">;
}
