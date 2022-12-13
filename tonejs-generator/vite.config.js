// Currently, there is no native Vite build option
// to build everything into a single-file and compress
// the HTML, so we'll use a couple of plugins to do so.

// See:
// https://github.com/vitejs/vite/issues/621
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      /**
       * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
       * @default src/main.ts
       */
      entry: "src/main.js",

      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          title: "Synth Garden",
          injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
    viteSingleFile({ removeViteModuleLoader: true }),
  ],
});
