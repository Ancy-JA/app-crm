import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://vineoback-gh-qa.caprover2.innogenio.com/graphql",
  generates: {
    "./src/interfaces/graphql.ts": {
      plugins: ["typescript"],
      documents: ["./src/**/*.tsx"],
      config: {
        skipTypename: true,
        enumsAsTypes: true,
      },
      hooks: { afterOneFileWrite: ["eslint --fix", "prettier --write"] },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
