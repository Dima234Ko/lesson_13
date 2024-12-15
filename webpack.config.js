
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "docs"),
  },
  resolve: {
    extensions: [".ts", ".js"], // Поддержка расширений .ts и .js
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.ts$/, // Обработка файлов TypeScript
      //   use: "ts-loader",
      //   exclude: /node_modules/,
      // },
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "images",
              publicPath: "images",
            },
          },
        ],
      },
    ],
  },
};