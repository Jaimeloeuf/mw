# api/src/controllers-http/
HTTP API Route Controllers defined here are automatically registered during codegen.


## Usage
1. To create a new controller file, use `npm run scripts:create-http-controller`.
    1. This will create a new httpController file, which you can then fill in the blanks and move it around as needed.
1. HTTP Controllers shouldnt be used manually, the `genHttpRoutesTable` codegen step will automatically create the `ExpressJS` backed router for all the controllers.
1. Once a new controller is added or a controller is deleted, re-run codegen with `npm run codegen all` to update the router.


## Additional notes
1. Instead of manually defining DTOs for httpControllers, the DTOs and other type definitions are generated with codegen step `genHttpControllerTypeDefinitions`, which means your client code can just use the types directly, and also "click to type definition" to bring you directly to where the controller implements that DTO boundary.
1. A better name for controllers is 'adapters', because thats what they are, they adapt incoming HTTP requests to service function calls.
    1. Similarly, there are other types of controllers or adapters like 'controllers-http' for other usecases like GraphQL resolves or m2m API adapters.