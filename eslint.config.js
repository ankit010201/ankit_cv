const { FlatCompat } = require("@eslint/eslintrc");
const compat = new FlatCompat({ baseDirectory: __dirname });
module.exports = [
  { ignores: [".next/**", ".vercel/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "react/jsx-no-comment-textnodes": "off",
      "@next/next/no-img-element": "off",
    },
  },
];
