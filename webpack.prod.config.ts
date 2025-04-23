import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import {
  Configuration as WebpackConfiguration,
  HotModuleReplacementPlugin,
} from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
//import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import StylelintWebpackPlugin from "stylelint-webpack-plugin";

const postcssPresetEnv = require("postcss-preset-env");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[local]__[name]__[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv()],
              },
            },
          },
          "sass-loader",
        ],
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[local]",
              },
            },
          },
          ,
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv()],
              },
            },
          },
          "sass-loader",
        ],
      },

      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      {
        test: /\.ttf/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    // plugin to extract css from the webpack javascript build files
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/public", to: "public" }],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/assets", to: "" }],
    }),
    new HotModuleReplacementPlugin(),
    //    new ForkTsCheckerWebpackPlugin({
    //      async: false,
    //    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    // lint the SASS files within the codebase only
    new StylelintWebpackPlugin({
      context: path.join(__dirname, "../src"),
      files: "**/*.*css",
    }),
  ],
  // prod specific configuration
  optimization: {
    // use terser plugin instead of uglify js to support minimisation for modern React.js features
    // optimize css assets plugin to minimise css as it is not yet supported in webpack by default

    // create a separate webpack runtime chunk that will be used for all bundles
    runtimeChunk: true,

    // the common chunks configuration
    splitChunks: {
      cacheGroups: {
        // commonly shared code i.e. vendor code to be bundled as vendor.js
        commons: {
          test: /node_modules/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};

export default config;
