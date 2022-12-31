import { fileURLToPath, URL } from "url"
import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"

export default defineConfig({
  resolve: {
    alias: {
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@custom-types": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@config": fileURLToPath(new URL("./src/config", import.meta.url))
    }
  },
  plugins: [solidPlugin()],
  server: {
    port: 3000
  },
  build: {
    target: "esnext"
  }
})
