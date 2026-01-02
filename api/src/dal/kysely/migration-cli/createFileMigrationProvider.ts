import fs from "fs/promises";
import { FileMigrationProvider } from "kysely";
import path from "path";

export function createFileMigrationProvider() {
  /** This needs to be an absolute path */
  const migrationFolder = path.join(import.meta.dirname, "../migrations");

  const fileMigrationProvider = new FileMigrationProvider({
    fs,
    path,
    migrationFolder,
  });

  return {
    migrationFolder,
    fileMigrationProvider,
  };
}
