# Scaffoldr
"Scaffoldr the code scaffolding tool" is the generic codegen based code scaffolding tool.

Where you use "scaffoldr module" to create a scaffolded version of something like a new http-controller module.


## Running Scaffoldr
This will list out the menu and you can follow this to use the tool
```bash
npm run codegen:scaffoldr
```

**Do not run the files directly** with something like `npx tsx ./path/to/your/scaffoldr/module.ts`, because this might cause issues and even fail, for e.g. since the path is relative to where the code is ran, it will not work.