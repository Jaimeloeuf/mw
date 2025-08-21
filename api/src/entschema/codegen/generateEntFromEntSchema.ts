import ts from "typescript";

import { EntSchema } from "../lib/EntSchema.js";
import { EntSchemaCodegenError } from "./EntSchemaCodegenError.js";
import { getNewline } from "./utils/getNewline.js";
import { prefixJsdocComment } from "./utils/prefixJsdocComment.js";

/**
 * Generates the TS AST node for the generated Ent
 */
export function generateEntFromEntSchema(
  entSchema: EntSchema,
  config: {
    entClassName: string;
  },
) {
  const entTypeID = entSchema.EntTypeID;
  // @todo Validate that it is 4 char and not used already...
  if (entTypeID === "") {
    throw new EntSchemaCodegenError("EntTypeID cannot be empty!");
  }

  return ts.factory.createClassDeclaration(
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier(config.entClassName),
    undefined,
    [
      ts.factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
        ts.factory.createExpressionWithTypeArguments(
          ts.factory.createIdentifier("BaseEnt"),
          undefined,
        ),
      ]),
    ],
    [
      prefixJsdocComment(
        [
          "ID to uniquely identify every Ent Type, and will be used as all",
          "the Ent instance's ID postfix. 4 character alphanumeric [a-z, 0-9]",
          "string for ~1.5 million unique IDs. This will allow us to quickly",
          "identify what is the Ent Type by looking at the Ent instance ID.",
        ],
        ts.factory.createPropertyDeclaration(
          [
            ts.factory.createToken(ts.SyntaxKind.StaticKeyword),
            ts.factory.createToken(ts.SyntaxKind.OverrideKeyword),
          ],
          ts.factory.createIdentifier("EntTypeID"),
          undefined,
          undefined,
          ts.factory.createStringLiteral(entTypeID),
        ),
      ),
      getNewline<ts.ClassElement>(),
      ts.factory.createConstructorDeclaration(
        undefined,
        [
          ts.factory.createParameterDeclaration(
            [
              ts.factory.createToken(ts.SyntaxKind.PublicKeyword),
              ts.factory.createToken(ts.SyntaxKind.ReadonlyKeyword),
            ],
            undefined,
            ts.factory.createIdentifier("data"),
            undefined,
            ts.factory.createTypeLiteralNode([
              prefixJsdocComment(
                ["Always included for all Ents"],
                ts.factory.createPropertySignature(
                  [ts.factory.createToken(ts.SyntaxKind.ReadonlyKeyword)],
                  ts.factory.createIdentifier("id"),
                  undefined,
                  ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                ),
              ),
              prefixJsdocComment(
                ["Always included for all Ents"],
                ts.factory.createPropertySignature(
                  [ts.factory.createToken(ts.SyntaxKind.ReadonlyKeyword)],
                  ts.factory.createIdentifier("createdAt"),
                  undefined,
                  ts.factory.createTypeReferenceNode(
                    ts.factory.createIdentifier(
                      "$DateTime.ISO.DateTime.Strong",
                    ),
                    undefined,
                  ),
                ),
              ),
              prefixJsdocComment(
                ["Always included for all Ents"],
                ts.factory.createPropertySignature(
                  undefined,
                  ts.factory.createIdentifier("updatedAt"),
                  undefined,
                  ts.factory.createTypeReferenceNode(
                    ts.factory.createIdentifier(
                      "$DateTime.ISO.DateTime.Strong",
                    ),
                    undefined,
                  ),
                ),
              ),

              /* Generate the custom data fields */
              ...entSchema
                .getFieldConfigs()
                .map((fieldConfig) => {
                  const mapping: Record<string, ts.KeywordTypeSyntaxKind> = {
                    string: ts.SyntaxKind.StringKeyword,
                    number: ts.SyntaxKind.NumberKeyword,
                    boolean: ts.SyntaxKind.BooleanKeyword,
                  };

                  const fieldType = mapping[fieldConfig.type];

                  if (fieldType === undefined) {
                    throw new EntSchemaCodegenError(
                      `Invalid field type found: ${fieldConfig.type}`,
                    );
                  }

                  const dataField = ts.factory.createPropertySignature(
                    undefined,
                    ts.factory.createIdentifier(fieldConfig.field),
                    undefined,
                    ts.factory.createKeywordTypeNode(fieldType),
                  );

                  return [
                    // Add a new line for every single field
                    getNewline<ts.TypeElement>(),

                    fieldConfig.description === undefined
                      ? dataField
                      : prefixJsdocComment(
                          [fieldConfig.description],
                          dataField,
                        ),
                  ];
                })
                .flat(),
            ]),
            undefined,
          ),
        ],
        ts.factory.createBlock(
          [
            ts.factory.createExpressionStatement(
              ts.factory.createCallExpression(
                ts.factory.createSuper(),
                undefined,
                [],
              ),
            ),
          ],
          true,
        ),
      ),
      // ts.factory.createMethodDeclaration(
      //   undefined,
      //   undefined,
      //   ts.factory.createIdentifier("testing"),
      //   undefined,
      //   undefined,
      //   [],
      //   undefined,
      //   undefined,
      // ),
    ],
  );
}
