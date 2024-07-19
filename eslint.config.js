import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  {
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals:globals.node
    },
  },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    settings: {
      react: {
        version: "detect", // Automatically detect the React version being used
        flowVersion: "0.99", // Flow version for typechecking
        createClass: "createReactClass", // Use createReactClass instead of React.createClass
        jsxRuntime: "automatic", // Use the latest jsx runtime
        transformJSX: "react-jsx", // Use the "react-jsx" transform
        throwOnInvalidProps: true, // Throw an error when invalid props are detected
        useJSXFragmentFactory: "React.Fragment", // Use the JSXFragment type
        jsxFragmentName: "Fragment", // Name of the JSXFragment type
        development: true, // Enable development mode
        // StrictMode: true, // Enable strict mode
        // exact: true, // Enable exact prop matching for stateless functional components
        // inlineElements: [], // List of inline elements that should not be wrapped in a <div>
        // maxDepth: 2, // Maximum
      },
    },
  },
];
