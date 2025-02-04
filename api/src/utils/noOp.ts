/**
 * No-Op function that does nothing.
 *
 * This has a wide and extensible type to allow it to be used in everywhere.
 */
export const noOp = <ParameterType extends Array<unknown>, ReturnType = any>(
  ..._Parameter: ParameterType
): ReturnType => undefined as any;
