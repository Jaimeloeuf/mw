import * as ts from "typescript";

/**
 * Utility function that extracts out a type alias given a .ts file and the name
 * of the type alias.
 *
 * Reference:
 * https://stackoverflow.com/questions/67222224/print-typescript-types-into-console-file
 */
export function getTypeofTypeAlias(filename: string, typeAlias: string) {
  const program = ts.createProgram([filename], { noEmit: true });

  const sourceFile = program.getSourceFile(filename);
  if (sourceFile === undefined) {
    return new Error(`Source file cannot be found: ${filename}`);
  }

  const statement = sourceFile.statements.find(
    (s) => ts.isTypeAliasDeclaration(s) && s.name.text === typeAlias,
  );
  if (statement === undefined) {
    return new Error(`Unable to find type alias: ${typeAlias}`);
  }

  const typeChecker = program.getTypeChecker();

  return typeChecker
    .getTypeAtLocation(statement)
    .getProperties()
    .map((property) => ({
      name: property.getName(),
      type: typeChecker.typeToString(
        typeChecker.getTypeOfSymbolAtLocation(property, statement),
      ),
    }));
}
