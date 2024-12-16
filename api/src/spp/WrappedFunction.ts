/**
 * How a SimplePostProcessing function should be, where it should be wrapped to
 * prevent it from throwing any errors and convert execution/throw results to
 * return as boolean.
 */
export type WrappedFunction = () => Promise<boolean>;
