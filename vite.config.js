import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        home: "index.html",
        networkFirst: "case-studies/network-first/index.html",
        cognitiveTalentAnalyzer: "case-studies/cognitive-talent-analyzer/index.html",
      },
    },
  },
});
