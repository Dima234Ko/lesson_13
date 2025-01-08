// webpack.config.js

import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    // eslint-disable-next-line no-undef
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    historyApiFallback: true,
  },
};
