import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

export default defineConfig({
  plugins: [
    react(),
    monacoEditorPlugin({
      languageWorkers: [
        "editorWorkerService",
        "typescript",
        "javascript",
        "json",
        "css",
        "html",
      ],
    }),
  ],
});
