const path = require("path");
const version = require("./package.json").version;

const rules = [{ test: /\.css$/, use: ["style-loader", "css-loader"] }];

module.exports = (env, argv) => {
  var devtool = argv.mode === "development" ? "source-map" : false;
  return [
    {
      // Notebook extension
      entry: "./lib/extension.js",
      output: {
        filename: "extension.js",
        path: path.resolve(__dirname, "..", "network_widget_3d", "nbextension"),
        libraryTarget: "amd",
        publicPath: "", // publicPath is set in extension.js
      },
      devtool,
    },
    {
      // Bundle for the notebook containing the custom widget views and models
      entry: "./lib/index.js",
      output: {
        filename: "index.js",
        path: path.resolve(__dirname, "..", "network_widget_3d", "nbextension"),
        libraryTarget: "amd",
        publicPath: "",
      },
      devtool,
      module: {
        rules: rules,
      },
      externals: ["@jupyter-widgets/base"],
    },
    {
      // Embeddable network_widget_3d bundle
      entry: "./lib/embed.js",
      output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "amd",
        publicPath: "https://unpkg.com/network_widget_3d@" + version + "/dist/",
      },
      devtool,
      module: {
        rules: rules,
      },
      externals: ["@jupyter-widgets/base"],
    },
  ];
};
