module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules/@vitejs/plugin-react"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // Add or update additional ESLint rules here
    "indent": ["error", 2], // Example: enforce 2-space indentation
    // "quotes": ["error", "single"], // Example: enforce single quotes for strings
    // Add or update other rules as needed
  },
};
