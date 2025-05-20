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

        /**
         * Utility to convert a Strong value to Strong variant of self without
         * validation and type casting, as it assumes that this is only called
         * the given value is Strong, i.e. is validated and type casted. If it
         * isnt already, use `makeStrongSafely` or `makeStrongAndThrowOnError`
         * methods to convert to Strong variant first before using this method,
         * as this conversion might fail and throw internally if the value is
         * not a Strong variant at runtime.
         *
         * Converts by adding "T00:00:00Z" to the "YYYY-MM-DD" Date string.
         *
         * This always converts it to UTC 00:00, i.e. midnight in UTC timezone.
         *
         * When creating a new Date instance, JS will always treat the input as
         * the server's local timezone value if no timezone is specified. So for
         * example, if the server is in Singapore, then "2025-05-18" will be
         * treated as "2025-04-17 00:00 GMT +8" instead of "2025-05-18 00:00 GMT
         * +0".
         *
         * Because of this, if timezone not explicitly set, then the converted
         * dates will always be different depending on the server's timezone. To
         * ensure consistency of this conversion regardless of server's timezone
         * /locale, all input needs to be treated as UTC 00:00, i.e. midnight in
         * UTC.
         *
         * The simplest way to set the timezone and time to be UTC midnight for
         * a given input string like YYYY-MM-DD is to add the later half of a
         * full ISO date time string, which is the "THH:mm:ssZ" part, which is
         * "T00:00:00Z", where the time is specified to be midnight with the 0s
         * and the timezone is specified to be UTC with the Z.
         */
        function fromDate(value: ISO.Date.Strong): Strong;

        /**
         * Utility to convert a Strong value to Strong variant of self without
         * validation and type casting, as it assumes that this is only called
         * the given value is Strong, i.e. is validated and type casted. If it
         * isnt already, use `makeStrongSafely` or `makeStrongAndThrowOnError`
         * methods to convert to Strong variant first before using this method,
         * as this conversion might fail and throw internally if the value is
         * not a Strong variant at runtime.
         */
        function fromSeconds(value: Unix.Seconds.Strong): Strong;

        /**
         * Utility to convert a Strong value to Strong variant of self without
         * validation and type casting, as it assumes that this is only called
         * the given value is Strong, i.e. is validated and type casted. If it
         * isnt already, use `makeStrongSafely` or `makeStrongAndThrowOnError`
         * methods to convert to Strong variant first before using this method,
         * as this conversion might fail and throw internally if the value is
         * not a Strong variant at runtime.
         */
        function fromMilliseconds(value: Unix.Milliseconds.Strong): Strong;
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

        /**
         * Utility to convert a Strong value to Strong variant of self without
         * validation and type casting, as it assumes that this is only called
         * the given value is Strong, i.e. is validated and type casted. If it
         * isnt already, use `makeStrongSafely` or `makeStrongAndThrowOnError`
         * methods to convert to Strong variant first before using this method,
         * as this conversion might fail and throw internally if the value is
         * not a Strong variant at runtime.
         *
         * Converts by stripping away "THH:mm:ssZ" from the ISO DateTime string.
         */
        function fromDateTime(value: ISO.DateTime.Strong): Strong;

        /**
         * Utility to convert a Strong value to Strong variant of self without
         * validation and type casting, as it assumes that this is only called
         * the given value is Strong, i.e. is validated and type casted. If it
         * isnt already, use `makeStrongSafely` or `makeStrongAndThrowOnError`
         * methods to convert to Strong variant first before using this method,
         * as this conversion might fail and throw internally if the value is
         * not a Strong variant at runtime.
         */
        function fromSeconds(value: Unix.Seconds.Strong): Strong;

        /**
         * Utility to convert a Strong value to Strong variant of self without
         * validation and type casting, as it assumes that this is only called
         * the given value is Strong, i.e. is validated and type casted. If it
         * isnt already, use `makeStrongSafely` or `makeStrongAndThrowOnError`
         * methods to convert to Strong variant first before using this method,
         * as this conversion might fail and throw internally if the value is
         * not a Strong variant at runtime.
         */
        function fromMilliseconds(value: Unix.Milliseconds.Strong): Strong;
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

        /**
         * Utility to convert a Strong value to Strong variant of self without
         * validation and type casting, as it assumes that this is only called
         * the given value is Strong, i.e. is validated and type casted. If it
         * isnt already, use `makeStrongSafely` or `makeStrongAndThrowOnError`
         * methods to convert to Strong variant first before using this method,
         * as this conversion might fail and throw internally if the value is
         * not a Strong variant at runtime.
         */
        function fromMilliseconds(value: Milliseconds.Strong): Strong;
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

        /**
         * Utility to convert a Strong value to Strong variant of self without
         * validation and type casting, as it assumes that this is only called
         * the given value is Strong, i.e. is validated and type casted. If it
         * isnt already, use `makeStrongSafely` or `makeStrongAndThrowOnError`
         * methods to convert to Strong variant first before using this method,
         * as this conversion might fail and throw internally if the value is
         * not a Strong variant at runtime.
         */
        function fromSeconds(value: Seconds.Strong): Strong;

        /**
         * Utility to convert a Strong value to Strong variant of self without
         * validation and type casting, as it assumes that this is only called
         * the given value is Strong, i.e. is validated and type casted. If it
         * isnt already, use `makeStrongSafely` or `makeStrongAndThrowOnError`
         * methods to convert to Strong variant first before using this method,
         * as this conversion might fail and throw internally if the value is
         * not a Strong variant at runtime.
         */
        function fromDateTime(value: ISO.DateTime.Strong): Strong;

        /**
         * Utility to convert a Strong value to Strong variant of self without
         * validation and type casting, as it assumes that this is only called
         * the given value is Strong, i.e. is validated and type casted. If it
         * isnt already, use `makeStrongSafely` or `makeStrongAndThrowOnError`
         * methods to convert to Strong variant first before using this method,
         * as this conversion might fail and throw internally if the value is
         * not a Strong variant at runtime.
         */
        function fromDate(value: ISO.Date.Strong): Strong;
      }
    }

    /**
     * Utility for generating $DateTime types from current time
     */
    namespace now {
      /**
       * Get date time of 'now' as `DateTime` (full ISO DateTime string in UTC).
       */
      function asIsoDateTime(): ISO.DateTime.Strong;

      /**
       * Get date time of 'now' as `Date` (an ISO YYYY-MM-DD string representing
       * UTC 00:00).
       */
      function asIsoDate(): ISO.Date.Strong;

      /**
       * Get date time of 'now' in seconds.
       */
      function asUnixSeconds(): Unix.Seconds.Strong;

      /**
       * Get date time of 'now' in milliseconds.
       */
      function asUnixMilliseconds(): Unix.Milliseconds.Strong;
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
      fromDate(value) {
        return (value + "T00:00:00Z") as $DateTime.ISO.DateTime.Strong;

        // Alternatively, Date constructor can be used to validate the results
        // to be extra safe but technically not needed if the given value is a
        // validated Strong "YYYY-MM-DD".
        // return new Date(value + "T00:00:00Z").toISOString() as $DateTime.ISO.DateTime.Strong;

        // Alternatively, this can be used although it is more complicated and
        // is only better if Date string has some components of time in it, but
        // should not happen in our case as the value passed in is a Strong
        // variant which assumes it is properly validated before type casting.
        // const [year, month, day] = value.split('-');
        // return new Date(
        //   Date.UTC(
        //     parseInt(year, 10),
        //     parseInt(month, 10) - 1, // Minus 1 as month value is 0 indexed
        //     parseInt(day, 10),
        //   ),
        // ).toISOString();
      },
      fromSeconds(value) {
        return new Date(
          value * 1000,
        ).toISOString() as $DateTime.ISO.DateTime.Strong;
      },
      fromMilliseconds(value) {
        return new Date(value).toISOString() as $DateTime.ISO.DateTime.Strong;
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
      fromDateTime(value) {
        const [dateOnlyComponent] = value.split("T");
        if (dateOnlyComponent === undefined) {
          throw new Error(`Failed to convert ISO DateTime to Date: ${value}`);
        }
        return dateOnlyComponent as $DateTime.ISO.Date.Strong;
      },
      fromSeconds(value) {
        return this.fromDateTime($DateTime.ISO.DateTime.fromSeconds(value));
      },
      fromMilliseconds(value) {
        return this.fromDateTime(
          $DateTime.ISO.DateTime.fromMilliseconds(value),
        );
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
      fromMilliseconds(value) {
        // `Math.trunc(value / 1000)` truncing method is more readable and
        // understandable with the same effect compared to this zero-fill right
        // shift implementation but this is faster.
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift
        return ((value / 1000) >>> 0) as $DateTime.Unix.Seconds.Strong;
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
      fromSeconds(value) {
        return (value * 1000) as $DateTime.Unix.Milliseconds.Strong;
      },
      fromDateTime(value) {
        // "When the time zone offset is absent, date-only forms are interpreted
        // as a UTC time and date-time forms are interpreted as a local time"
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
        // Since Strong ISO.DateTime strings are validated to use UTC time, the
        // local time interpretation is ignored to use UTC timezone.
        return new Date(value).getTime() as $DateTime.Unix.Milliseconds.Strong;
      },
      fromDate(value) {
        // "When the time zone offset is absent, date-only forms are interpreted
        // as a UTC time"
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
        return new Date(value).getTime() as $DateTime.Unix.Milliseconds.Strong;
      },
    },
  },
  now: {
    asIsoDateTime() {
      return new Date().toISOString() as $DateTime.ISO.DateTime.Strong;
    },
    asIsoDate() {
      return $DateTime.ISO.Date.fromDateTime(this.asIsoDateTime());
    },
    asUnixSeconds() {
      return $DateTime.Unix.Seconds.fromMilliseconds(this.asUnixMilliseconds());
    },
    asUnixMilliseconds() {
      return Date.now() as $DateTime.Unix.Milliseconds.Strong;
    },
  },
};
