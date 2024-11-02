/**
 * Set of all files to skip when generating barrel file.
 */
export const filesToSkipForBarrelFileCodegen = new Set<string>();

/**
 * Pass in file name, if you do not want to have the file automatically included
 * in the generated barrel file of the `__generated/` folder.
 */
export function doNotIncludeFileInGeneratedFolderBarrelFile(file: string) {
  filesToSkipForBarrelFileCodegen.add(file);
}
