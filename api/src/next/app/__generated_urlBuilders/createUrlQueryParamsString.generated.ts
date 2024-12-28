/**
 * ********************* THIS IS A GENERATED FILE *****************************
 * ********************* DO NOT MODIFY OR FORMAT MANUALLY *********************
 *
 * This file is automatically generated with the module:
 * genStandaloneHttpControllerUrlBuilders
 *
 * Generated hash in hex for code after this section is:
 * sha256(1a2252b3afbe3a687454d194555604b4d8c1886dad67851effba682f04342cfb)
 */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable perfectionist/sort-exports */
export function createUrlQueryParamsString(
  urlQueryParams: undefined | null | Record<string, any>,
) {
  if (urlQueryParams == null) {
    return "";
  }

  const queryParams = new URLSearchParams();

  for (const [k, v] of Object.entries(urlQueryParams)) {
    queryParams.append(k, v?.toString() as string);
  }

  return "?" + queryParams.toString();
}