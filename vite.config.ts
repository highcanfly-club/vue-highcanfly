/*!
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
*/
/*!
=========================================================
* © 2022 Ronan LE MEILLAT for HighCanFly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- And many others
*/
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import cesium from "./src/plugins/cesium";
import vitePluginFontawesomeminify from "@highcanfly-club/fontawesome";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cesium({ addTags: false }),
    vitePluginFontawesomeminify({ glyphWhitelist: ["?"] }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./node_modules"),
      "§": path.resolve(__dirname, "./"),
    },
  },
  optimizeDeps: { include: ["lodash.throttle", "lodash.orderby"] },
  server: {
    https: fs.existsSync("./localhost.key")
      ? {
          key: fs.readFileSync("./localhost.key"),
          cert: fs.readFileSync("./localhost.pem"),
        }
      : false,
  },
});
