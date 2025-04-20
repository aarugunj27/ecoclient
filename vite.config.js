import react from "@vitejs/plugin-react";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default {
  plugins: [
    react(),
    wasm(), // Add wasm plugin
    topLevelAwait(), // Add topLevelAwait plugin
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/onnxruntime-web/dist/*.wasm",
          dest: "assets", // Copy wasm files to the assets directory
        },
      ],
    }),
  ],
  // server: { // Remove this block, it's not needed for serving WASM files.
  //   headers: {
  //     "Content-Type": "application/wasm",
  hmr: { overlay: false },
  //   },
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  assetsInclude: ["**/*.onnx"], // Allows importing ONNX models directly
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[ext]", // Keeps ONNX extension clean and consistent
      },
    },
  },
  optimizeDeps: {
    exclude: ["onnxruntime-web"], // Exclude onnxruntime-web from optimization
  },
};
