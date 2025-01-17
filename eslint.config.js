
// import pluginJs from "@eslint/js";
// import globals from "globals";
// import { }  from 'eslint-config-airbnb-base';

//
// export default [
//   {
//       languageOptions: {
//           globals: {
//               ...globals.node,
//               ...globals.jest
//           },
//       }
//   },
//   pluginJs.configs.recommended,
// ];


import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,                  // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname,       // optional
  recommendedConfig: js.configs.recommended, // optional unless you're using "eslint:recommended"
  allConfig: js.configs.all,                 // optional unless you're using "eslint:all"
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  // mimic ESLintRC-style extends
  ...compat.extends("airbnb-base", "plugin:jest/recommended"),

  // mimic environments
  ...compat.env({
    es2020: true,
    node: true
  }),
  {
    rules: {
      "no-console": 0,
      "import/extensions": 0,
      "no-underscore-dangle": [2, { "allow": ["__filename", "__dirname"] }]
    }
  }
];