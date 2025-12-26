import ts from "typescript";

export function prefixSinglelineComment<T extends ts.Node>(
  comment: string,
  astNode: T,
) {
  return ts.addSyntheticLeadingComment(
    astNode,
    ts.SyntaxKind.SingleLineCommentTrivia,
    comment,
    true,
  );
}
