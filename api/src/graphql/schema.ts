import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 */
export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      version: {
        type: GraphQLString,
        async resolve() {
          return "0.0.0";
        },
      },
    },
  }),
});
