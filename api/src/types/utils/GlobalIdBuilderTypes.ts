/**
 * Utility types to build ID types, using the `$MakeBranded` and `$MakeFlavored`
 * utility types. Branding and Flavoring are used to create strong and weak ID
 * types respectively, where they can be converted back and forth using utility
 * functions.
 *
 * Declaring all globally available utility types here with a $ prefix to
 * signify that these are in the global scope.
 */
declare global {
  /**
   * Create weak (implicit primitive to ID type conversion allowed) string ID.
   */
  type $WeakStringID<IdType extends string> = $MakeFlavored<string, IdType>;

  /**
   * Create strong (implicit primitive to ID type conversion not allowed) string
   * ID.
   */
  type $StrongStringID<IdType extends string> = $MakeBranded<string, IdType>;
}
