declare global {
  /**
   * Global utility for working with date and time, and works with different
   * types of date and time, i.e. ISO8601, unix timestamps, ...
   */
  namespace $DateTime {
    /**
     * Utility for ISO8601 strings
     */
    namespace ISO {
      /**
       * DateTime refers to the full ISO DateTime string and always stored /
       * represented internally in UTC.
       *
       * Weak variant, allows implicit string to DateTime conversion, i.e. can
       * treat strings as a `$DateTime.ISO.DateTimeWeak` without any validation
       * and/or type casting.
       */
      type DateTimeWeak = $MakeFlavoredString<"ISO_DateTime">;

      /**
       * DateTime refers to the full ISO DateTime string and always stored /
       * represented internally in UTC.
       *
       * Strong variant, does not allow implicit string to DateTime conversion,
       * i.e. cannot treat strings as a `$DateTime.ISO.DateTimeStrong` until it
       * is validated and/or type casted, preferably with the utility functions
       * in this same namespace.
       */
      type DateTimeStrong = $MakeBrandedString<"ISO_DateTime">;

      /**
       * Date refers to only the YYYY-MM-DD portion of ISO DateTime strings and
       * these are always always treated / stored / represented internally as
       * UTC 00:00.
       *
       * Weak variant, allows implicit string to Date conversion, i.e. can treat
       * strings as a `$DateTime.ISO.DateWeak` without any validation and/or
       * type casting.
       */
      type DateWeak = $MakeFlavoredString<"ISO_Date">;

      /**
       * Date refers to only the YYYY-MM-DD portion of ISO DateTime strings and
       * these are always always treated / stored / represented internally as
       * UTC 00:00.
       *
       * Strong variant, does not allow implicit string to Date conversion, i.e.
       * cannot treat strings as a `$DateTime.ISO.DateStrong` until it is
       * validated and/or type casted, preferably with the utility functions in
       * this same namespace.
       */
      type DateStrong = $MakeBrandedString<"ISO_Date">;
    }
  }
}
