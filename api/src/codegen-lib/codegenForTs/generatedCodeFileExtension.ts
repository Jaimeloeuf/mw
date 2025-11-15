export const generatedCodeFileExtension = ".generated.ts";

export const generatedCodeFileExtensionWithNoBarrelFileInclusion =
  ".generated.do_not_include_in_barrel_file.ts";

export const generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport =
  generatedCodeFileExtensionWithNoBarrelFileInclusion.replace(".ts", ".js");

export const generatedCodeFileExtensionForJsImport =
  generatedCodeFileExtension.replace(".ts", ".js");
