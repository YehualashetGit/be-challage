/*
 * @format
 */

const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = (_env) => {
  return {
    entry: { Api: "./src/index.ts" },
    devtool: "inline-source-map",
    mode: "production",
    target: "node",
    module: {
      rules: [
        { test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] },
          },
        },
      ],
    },
    optimization: { minimize: false },
    externals: [nodeExternals()],
    resolve: {
      modules: [path.resolve(__dirname), "node_modules"],
      extensions: [".ts", ".js"],
    },
    output: { filename: "[name].js", path: path.resolve(__dirname, "dist") },
    node: { __dirname: false },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  };
};
