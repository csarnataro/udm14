import { defineConfig } from 'wxt';
import preact from "@preact/preset-vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [preact()],
  }),
  manifest: {
    name: "Prefer Web",
    short_name: "Prefer Web",
    permissions: [
      'storage',
      'declarativeNetRequest',
    ],
    declarative_net_request: {
      rule_resources: [{
        id: "ruleset_1",
        enabled: true,
        path: "rules.json"
      }]
    },
  },
});
