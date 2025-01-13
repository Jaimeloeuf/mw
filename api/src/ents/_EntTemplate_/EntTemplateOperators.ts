// @ts-nocheck
import { apiDB } from "../../dal/kysely/index.js";
import { defineEntOperators } from "../../ent/index.js";
import { EntTemplate } from "./EntTemplate.js";

export const EntTemplateOperators = defineEntOperators(EntTemplate, {
  CRUD: {
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

  custom: {
    // Implement any custom operator methods using your preferred storage layer.
    // You can use JSDocs on the methods here and it will be available in your
    // product code.
    // /**
    //  * E.g. Check if user is allowed to do this action
    //  */
    // canUserDeleteThis: string;
  },
});
