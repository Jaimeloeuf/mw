import { createHandler } from "graphql-http/lib/use/http";

import { schema } from "./schema.js";

/**
 * HTTP route handler for the GraphQL over HTTP endpoint.
 */
export const httpRouteHandlerForGraphQL = createHandler({ schema });
