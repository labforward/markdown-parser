import { defineConfig } from "eslint/config";
import nodeConfig from "@laboperator-gmbh/eslint-config-node";

export default defineConfig(
  nodeConfig,
  { ignores: ["bin/**/*", "dist/**/*"] },
  {
    rules: {
      "max-statements": "off",
      "import/extensions": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
);
