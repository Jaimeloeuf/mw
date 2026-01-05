const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that all DB (kysely) migrations and migration-cli code is only used for migrations and never imported/used outside of migration folders.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    // If file is part of migrations, ignore checks by returning empty visitor
    // object.
    if (isMigrationCode(context.filename)) {
      return {};
    }

    // Check all imports of non migrations code modules
    return {
      /**
       * For static `import ... from "..."` statements
       */
      ImportDeclaration(node) {
        reportIfImportingFromMigrations(
          context,
          node,
          node.source && node.source.value,
        );
      },

      /**
       * For dynamic `import(...)` statements
       */
      ImportExpression(node) {
        reportIfImportingFromMigrations(
          context,
          node,
          node.source && node.source.value,
        );
      },
    };
  },
};

const migrationsPath = path.join(__dirname, `../src/dal/kysely/migrations`);
const migrationCliPath = path.join(
  __dirname,
  `../src/dal/kysely/migration-cli`,
);

function isMigrationCode(filePath) {
  const migrationsRelativePath = path.relative(migrationsPath, filePath);

  const fileIsInMigrations =
    migrationsRelativePath &&
    !migrationsRelativePath.startsWith("..") &&
    !path.isAbsolute(migrationsRelativePath);

  const migrationCliRelativePath = path.relative(migrationCliPath, filePath);

  const fileIsInMigrationCli =
    migrationCliRelativePath &&
    !migrationCliRelativePath.startsWith("..") &&
    !path.isAbsolute(migrationCliRelativePath);

  return fileIsInMigrations || fileIsInMigrationCli;
}

function reportIfImportingFromMigrations(context, nodeForReport, sourceValue) {
  // Source value could be something invalid or something "virtual:"
  if (typeof sourceValue !== "string" || !sourceValue) {
    return;
  }

  // Using simple heuristic check on the import path string
  // A more advance version would be to resolve the module/imported-path and
  // re-use the `isMigrationCode` function to check if it is migrations code.
  if (sourceValue.includes("migration")) {
    context.report({
      node: nodeForReport,
      message: `Importing migrations code is not allowed outside migrations folder, found import of '${sourceValue}'`,
    });
  }
}
