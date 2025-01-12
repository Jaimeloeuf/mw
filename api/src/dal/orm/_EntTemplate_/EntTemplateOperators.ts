// @todo Remove this
// @ts-nocheck

import { apiDB } from "../../kysely/index.js";
import { defineEntCrudOperator } from "../Orm.js";
import { EntTemplate } from "./EntTemplate.js";

export const EntTemplateOperators = defineEntCrudOperator({
  entClass: EntTemplate,

  entCrudOperators: {
    async create(ent) {
      // Implement create method using your preferred storage layer.
    },

    async get(id) {
      // Implement get method using your preferred storage layer.
      // return new EntTemplate({
      //   ...
      // });
    },

    async update(ent) {
      // Implement update method using your preferred storage layer.
    },

    async delete(id) {
      // Implement delete method using your preferred storage layer.
    },
  },

  entCustomOperators: {
    // Implement any custom operator methods using your preferred storage layer.
  },
});
