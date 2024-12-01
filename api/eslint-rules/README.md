# eslint-rules
Custom eslint rules for MW are defined here and exported through a common plugin [./eslint-plugin-mw.cjs](./eslint-plugin-mw.cjs)


## Adding new rules / Deleting rules
1. Add / delete your rule to [./eslint-plugin-mw.cjs](./eslint-plugin-mw.cjs)
1. Update [eslint config](../eslint.config.js)
1. For editor integration, you usually need to reload your editor or restart the ESLint server for new rules to take effect directly.