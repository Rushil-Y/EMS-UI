const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: { app: "./Components/App.jsx" },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    ie: "11",
                    edge: "15",
                    safari: "10",
                    firefox: "50",
                    chrome: "49",
                  },
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendor",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true",
    }),
  ],
  devtool: "source-map",
};
