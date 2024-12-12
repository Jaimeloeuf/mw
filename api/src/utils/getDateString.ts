/**
 * Create date string in the YYYYMMDD format in UTC time for the given `Date`
 * object, if no `Date` passed in, a new `Date` will be used.
 */
export function getDateString(date: Date = new Date()) {
  const year = date.getUTCFullYear();

  const month = date.getUTCMonth() + 1; // Zero based month
  const monthString = month > 9 ? month : `0${month}`;

  const day = date.getUTCDate();
  const dayString = day > 9 ? day : `0${day}`;

  return `${year}${monthString}${dayString}`;
}
