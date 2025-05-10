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
       */
      namespace DateTime {
        /**
         * Weak variant, allows implicit string to DateTime conversion, i.e. can
         * treat strings as a `$DateTime.ISO.DateTime.Weak` without any
         * validation and/or type casting.
         */
        type Weak = $MakeFlavoredString<"ISO_DateTime">;

        /**
         * Strong variant, does not allow implicit string to DateTime
         * conversion, i.e. cannot treat strings as a
         * `$DateTime.ISO.DateTime.Strong` until it is validated and/or type
         * casted, preferably with the utility functions in this same namespace.
         */
        type Strong = $MakeBrandedString<"ISO_DateTime">;
      }

      /**
       * Date refers to only the YYYY-MM-DD portion of ISO DateTime strings and
       * these are always always treated / stored / represented internally as
       * UTC 00:00.
       */
      namespace Date {
        /**
         * Date refers to only the YYYY-MM-DD portion of ISO DateTime strings
         * and these are always always treated / stored / represented internally
         * as UTC 00:00.
         *
         * Weak variant, allows implicit string to Date conversion, i.e. can
         * treat strings as a `$DateTime.ISO.Date.Weak` without any validation
         * and/or type casting.
         */
        type Weak = $MakeFlavoredString<"ISO_Date">;

        /**
         * Date refers to only the YYYY-MM-DD portion of ISO DateTime strings
         * and these are always always treated / stored / represented internally
         * as UTC 00:00.
         *
         * Strong variant, does not allow implicit string to Date conversion,
         * i.e. cannot treat strings as a `$DateTime.ISO.Date.Strong` until it
         * is validated and/or type casted, preferably with the utility
         * functions in this same namespace.
         */
        type Strong = $MakeBrandedString<"ISO_Date">;
      }
    }

    /**
     * Utility for unix timestamps
     */
    namespace Unix {
      /**
       * Number of seconds since unix epoch.
       */
      namespace Seconds {
        /**
         * Weak variant, allows implicit number to Seconds conversion, i.e. can
         * treat numbers as a `$DateTime.Unix.Seconds.Weak` without any
         * validation and/or type casting.
         */
        type Weak = $MakeFlavoredNumber<"unix_Seconds">;

        /**
         * Strong variant, does not allow implicit number to Seconds conversion,
         * i.e. cannot treat numbers as a `$DateTime.Unix.Seconds.Strong` until
         * it is validated and/or type casted, preferably with the utility
         * functions in this same namespace.
         */
        type Strong = $MakeBrandedNumber<"unix_Seconds">;
      }

      /**
       * Number of milliseconds since unix epoch.
       */
      namespace Milliseconds {
        /**
         * Weak variant, allows implicit number to Milliseconds conversion, i.e.
         * can treat numbers as a `$DateTime.Unix.Milliseconds.Weak` without any
         * validation and/or type casting.
         */
        type Weak = $MakeFlavoredNumber<"unix_Milliseconds">;

        /**
         * Strong variant, does not allow implicit number to Milliseconds
         * conversion, i.e. cannot treat numbers as a
         * `$DateTime.Unix.Milliseconds.Strong` until it is validated and/or
         * type casted, preferably with the utility functions in this same
         * namespace.
         */
        type Strong = $MakeBrandedNumber<"unix_Milliseconds">;
      }
    }
  }
}
