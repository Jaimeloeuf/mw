import { ValidationFailedException } from "../../exceptions/ValidationFailedException.js";

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

        /**
         * Utility to convert a Weak variant to Strong variant after validation
         * and type casting. This will throw on validation error.
         */
        function makeStrongAndThrowOnError(value: Weak): Strong;

        /**
         * Utility to convert a Weak variant to Strong variant after validation
         * and type casting. This will not throw on validation error and instead
         * return a `$ResultTuple`.
         */
        function makeStrongSafely(value: Weak): $ResultTuple<Strong>;
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

        /**
         * Utility to convert a Weak variant to Strong variant after validation
         * and type casting. This will throw on validation error.
         */
        function makeStrongAndThrowOnError(value: Weak): Strong;

        /**
         * Utility to convert a Weak variant to Strong variant after validation
         * and type casting. This will not throw on validation error and instead
         * return a `$ResultTuple`.
         */
        function makeStrongSafely(value: Weak): $ResultTuple<Strong>;
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

        /**
         * Utility to convert a Weak variant to Strong variant after validation
         * and type casting. This will throw on validation error.
         */
        function makeStrongAndThrowOnError(value: Weak): Strong;

        /**
         * Utility to convert a Weak variant to Strong variant after validation
         * and type casting. This will not throw on validation error and instead
         * return a `$ResultTuple`.
         */
        function makeStrongSafely(value: Weak): $ResultTuple<Strong>;
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

        /**
         * Utility to convert a Weak variant to Strong variant after validation
         * and type casting. This will throw on validation error.
         */
        function makeStrongAndThrowOnError(value: Weak): Strong;

        /**
         * Utility to convert a Weak variant to Strong variant after validation
         * and type casting. This will not throw on validation error and instead
         * return a `$ResultTuple`.
         */
        function makeStrongSafely(value: Weak): $ResultTuple<Strong>;
      }
    }
  }
}

/**
 * Define utilities for the $DateTime type in global scope after the ambient
 * namespace definitions.
 */
globalThis.$DateTime = {
  ISO: {
    DateTime: {
      makeStrongAndThrowOnError(value) {
        const date = new Date(value);
        if (
          isNaN(date.valueOf()) ||
          date.toISOString() !== value ||
          date.toString() === "Invalid Date"
        ) {
          throw new ValidationFailedException(
            `Invalid ISO DateTime (full) string: ${value}`,
          );
        }
        return value as $DateTime.ISO.DateTime.Strong;
      },
      makeStrongSafely(value) {
        return $runFnSafely(this.makeStrongAndThrowOnError, value);
      },
    },
    Date: {
      makeStrongAndThrowOnError(value) {
        /** Checks if a string is an integer. */
        function isInvalidInt(s?: string) {
          if (s === undefined || s === "") {
            return true;
          }
          const num = Number(s);
          return isNaN(num) || !Number.isInteger(num);
        }

        const [year, month, day] = value.split("-");
        if (isInvalidInt(year) || isInvalidInt(month) || isInvalidInt(day)) {
          throw new ValidationFailedException(
            `Invalid YYYY-MM-DD string: ${value}`,
          );
        }

        return value as $DateTime.ISO.Date.Strong;
      },
      makeStrongSafely(value) {
        return $runFnSafely(this.makeStrongAndThrowOnError, value);
      },
    },
  },
  Unix: {
    Seconds: {
      makeStrongAndThrowOnError(value) {
        if (value > +8.64e12 || value < -8.64e12) {
          throw new ValidationFailedException(
            `Invalid unix timestamp in seconds: ${value}`,
          );
        }
        return value as $DateTime.Unix.Seconds.Strong;
      },
      makeStrongSafely(value) {
        return $runFnSafely(this.makeStrongAndThrowOnError, value);
      },
    },
    Milliseconds: {
      makeStrongAndThrowOnError(value) {
        if (value > +8.64e15 || value < -8.64e15) {
          throw new ValidationFailedException(
            `Invalid unix timestamp in milliseconds: ${value}`,
          );
        }
        return value as $DateTime.Unix.Milliseconds.Strong;
      },
      makeStrongSafely(value) {
        return $runFnSafely(this.makeStrongAndThrowOnError, value);
      },
    },
  },
};
