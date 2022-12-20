import vue from "@vitejs/plugin-vue";
import node from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import processScss from "rollup-plugin-sass";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import json from "@rollup/plugin-json";
import images from "@rollup/plugin-image";
import copy from "rollup-plugin-copy-assets";
import fs from "fs";

fs.rmSync("dist", { recursive: true, force: true });

const vuePluginConfig = {
  template: {
    isProduction: true,
    compilerOptions: {
      whitespace: "condense",
    },
  },
  style: {
    postcssPlugins: [tailwindcss, autoprefixer],
  },
};

const config = [
  {
    input: "./index.ts",
    external: ["vue"],
    output: { format: "es", file: "dist/index.js", sourcemap: true },
    plugins: [
      node({
        rootDir: ".",
        extensions: [".vue", ".ts"],
      }),
      json(),
      images(),
      vue(vuePluginConfig),
      postcss({ extract: true, process: processScss }),
      typescript(
        { useTsconfigDeclarationDir: true },
      ),
      copy({
        assets: [
        ],
      })
    ],
  },
];

export default () => {
  return config;
};
