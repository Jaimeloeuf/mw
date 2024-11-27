import { relative } from "path";

/**
 * Utility function to generate a name/string using the relative path with camel
 * case. This allow names in folders to be uniquely "namespaced" in the global
 * scope as long as they are unique in their own folders.
 */
export const generateFullFileNameFromRelativePath = (
  /**
   * Root folder path to start the namespacing from.
   */
  folderPath: string,

  /**
   * Path to the actual file itself.
   */
  filePath: string,

  /**
   * The file extension will be stripped out when creating the new file name.
   */
  fileExtension: string,
) =>
  relative(folderPath, filePath)
    // Remove file extension to only keep the name itself
    .replace(fileExtension, "")

    // Use regex to convert path splitters '/' into camelCase delimiters.
    // E.g. folder/another/myData to folderAnotherMyData
    .replace(/\/([a-zA-Z])/g, (_, char) => char.toUpperCase())

    // Use regex to convert strings with '-' into camelCase delimiters.
    // E.g. folder-with-dash/myData to folderWithDashMyData
    .replace(/-([a-zA-Z])/g, (_, char) => char.toUpperCase());
