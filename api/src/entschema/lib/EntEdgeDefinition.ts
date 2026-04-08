export type BaseEntEdgeDefinition = {
  /**
   * The specific Ent Edge type definition should override this to a string
   * literal.
   */
  type: string;
  name: string;
  description?: string;
  /**
   * Optional Ent class type that this links to
   */
  classs?: any;
};

export interface EntFieldEdgeDefinition extends BaseEntEdgeDefinition {
  type: "field-edge";
  idField: string;
}

export interface EntAssocEdgeDefinition extends BaseEntEdgeDefinition {
  type: "assoc-edge";
}

export type EntEdgeDefinition = EntFieldEdgeDefinition | EntAssocEdgeDefinition;
