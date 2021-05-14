const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const entryPath = "./src/main.ts";
const outputPath = path.resolve(__dirname, "dist");

module.exports = (env, options) => {
  const config = {
    output: {
      filename: "[name].js",
      path: outputPath,
    },
    resolve: {
      extensions: [".webpack.js", "web.js", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.ts$/,
          enforce: "pre",
          use: ["source-map-loader"],
          exclude: /node_modules/,
        },
      ],
    },
  };

  if (options.mode === "development") {
    config.entry = entryPath;
    config.devtool = "source-map";
    config.plugins = [
      new webpack.EnvironmentPlugin({
        NODE_ENV: "dev",
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({ template: "./index.html" }),
    ];

    config.devServer = {
      hot: true,
      host: "localhost",
      port: 8000,
      contentBase: outputPath,
      stats: {
        color: true,
      },
    };
  }

  return config;
};
