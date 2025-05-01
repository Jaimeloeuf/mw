export type EntFieldEdgeDefinition = {
  type: "field-edge";
  idField: string;
};

export type EntAssocEdgeDefinition = {
  type: "assoc-edge";
};

export type EntEdgeDefinition = {
  name: string;
  description?: string;
} & (EntFieldEdgeDefinition | EntAssocEdgeDefinition);
