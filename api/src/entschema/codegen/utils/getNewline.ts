import ts from "typescript";

/**
 * Get a newline for your AST, and is generic to allow you to type cast it to
 * whatever you want to ensure that it can be fitted nicely in your AST
 */
export function getNewline<T extends ts.Node>() {
  return ts.factory.createIdentifier("\n") as unknown as T;
}
