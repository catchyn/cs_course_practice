const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  devtool: "eval",
  mode: "development",
  entry: './src/scripts/index.ts',
  devServer: {
    open: true,
    port: 9000,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' },        {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    }],
  },
  plugins: [new HtmlWebpackPlugin({ inject: 'body', template: './src/index.html' })],
};
