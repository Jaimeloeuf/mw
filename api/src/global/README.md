# api/src/global/
> Modify this cautiously!


## Notes
1. Folder for all the code / types that will affect things in the global scope.
1. Things should only be placed in here if
    1. It is an additional type/feature that feels like it should be a part of the language due to how low level it is
        1. e.g. `$Nullable`, `$DateTime`, ...
    1. It is used so pervasively in the codebase that it makes sense to have it be easily accessible
        1. e.g. `$DateTime`, ...
1. Declaring all globally available types/namespaces/etc... with a `$` prefix to signify that these are in the global scope.