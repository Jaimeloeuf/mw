# api/src/global/idTypes/
Folder for all code/types used to work with common ID types like UUID.

## Note
1. These are not just type aliases to primitive types (string/number), instead these are Strong and Weak ID types made using `Branding` and `Flavoring` utility types.
1. Every ID type has a Weak and Strong variant.
1. Declaring all globally available types with a $ prefix to signify that these are in the global scope.