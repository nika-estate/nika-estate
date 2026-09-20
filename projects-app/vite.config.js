import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist/client",
    assetsDir: "project-assets",
    rollupOptions: {
      input: {
        centralPark: resolve("central-park/index.html"),
        thyme: resolve("thyme/index.html"),
        jadeel: resolve("jadeel/index.html"),
        havencia: resolve("havencia/index.html"),
        quizCentralPark: resolve("quiz/central-park/index.html"),
        quizThyme: resolve("quiz/thyme/index.html"),
        quizJadeel: resolve("quiz/jadeel/index.html"),
        quizHavencia: resolve("quiz/havencia/index.html"),
      },
    },
  },
});
