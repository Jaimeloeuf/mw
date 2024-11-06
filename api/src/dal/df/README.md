# api/src/dal/df/
`df` (Data Function) implementations.


## Notes
1. `df` are functions that implement a single data operation
    1. This data operation can either be a Query (Read) or a Mutation (Create/Update/Delete)
    1. For now there is no distinction between Queries and Mutations for `df` definitions.
1. All `df` files must use the `.df.ts` file extension for it to be included during the codegen step [`genDataFunctionBarrelFile`](../../codegen/genDataFunctionBarrelFile/genDataFunctionBarrelFile.ts)