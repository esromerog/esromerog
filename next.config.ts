import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: "export",
  distDir: "build",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader"],
    });
    return config;
  },
  turbopack: {
    rules: {
      "*.frag": {
        loaders: [path.resolve('./node_modules/raw-loader')],
        as: "*.js",
      },
      "*.vert": {
        loaders: [path.resolve('./node_modules/raw-loader')],
        as: "*.js",
      },
      "*.glsl": {
        loaders: [path.resolve('./node_modules/raw-loader')],
        as: "*.js",
      },
    },
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
