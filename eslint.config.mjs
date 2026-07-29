// eslint-config-next ships a native ESLint flat config (an array of
// Linter.Config objects) as of the version pinned in package.json, so it
// can be spread directly rather than routed through the legacy
// FlatCompat shim. The shim path triggered a circular-reference crash
// when resolving eslint-plugin-react through this combination of
// package versions; importing the flat config directly avoids it and is
// also the currently-recommended approach for Next.js + ESLint 9+.
import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
