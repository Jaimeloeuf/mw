/**
 * Given a mapped type, loop through every field to make sure we only include
 * keep fields that are not `never`.
 *
 * E.g. usecase, assuming `webhookTelegramController_QueryParams` is `never`.
 * ```typescript
 * type Options = OptionalIfNever<{
 *   urlParams: webhookTelegramController_UrlParams;
 *   urlQueryParams: webhookTelegramController_QueryParams;
 * }>
 * ```
 * Type `Options` here becomes
 * `{ urlParams: webhookTelegramController_UrlParams; }`
 */
export type RemoveMapKeyIfNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};
