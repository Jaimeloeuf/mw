import ts from "typescript";

export function prefixJsdocComment<T extends ts.Node>(
  comments: $NonEmptyArray<string>,
  astNode: T,
) {
  const comment =
    "*\n" + comments.map((comment) => ` * ${comment}`).join("\n") + "\n ";
  return ts.addSyntheticLeadingComment(
    astNode,
    ts.SyntaxKind.MultiLineCommentTrivia,
    comment,
    true,
  );
}
