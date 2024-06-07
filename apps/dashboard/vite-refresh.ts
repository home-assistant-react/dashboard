import { readFile } from "node:fs/promises";
import { type Plugin } from "vite";

export interface RefreshPluginOptions {
  /**
   * Additional packages (node_modules) to watch for changes.
   *
   * All non-dev dependencies are included by default. Packages included
   * here will be appended to the default list. Use the `exclude` option
   * to remove packages from the default list.
   */
  include?: string[];
  /**
   * Packages (node_modules) to be excluded from change detection.
   */
  exclude?: string[];
}

export const viteRefresh = ({
  include = [],
  exclude = [],
}: RefreshPluginOptions = {}): Plugin => ({
  name: "vite-plugin-refresh",
  apply: "serve",
  config: async () => {
    const packageJson = await readFile("package.json", "utf-8").then((json) =>
      JSON.parse(json),
    );
    const deps = new Set(
      Object.keys({
        ...packageJson.dependencies,
        ...packageJson.peerDependencies,
        ...packageJson.optionalDependencies,
        // Dev dependencies are intentionally excluded from the default.
      }),
    );

    include.forEach((dep) => deps.add(dep));
    exclude.forEach((dep) => deps.delete(dep));

    return {
      server: {
        watch: {
          ignored: [...(deps as never)].map(
            (dep) => `!**/node_modules/${dep}/**`,
          ),
        },
      },
    };
  },
});
