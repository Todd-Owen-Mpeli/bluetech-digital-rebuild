import nextEslintConfig from "eslint-config-next";

const eslintConfig = [
  ...nextEslintConfig,
  // Add custom rules
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];

export default eslintConfig;