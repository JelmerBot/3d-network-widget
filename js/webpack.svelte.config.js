const path = require("path");

module.exports = (env, argv) => {
  var devtool = argv.mode === "development" ? "source-map" : false;
  return [
    {
      // Svelte app to js bundle
      entry: "./src/App.svelte",
      output: {
        filename: "app.js",
        path: path.resolve(__dirname, "lib"),
        libraryTarget: "amd",
        publicPath: "", // publicPath is set in extension.js
      },
      devtool,
      module: {
        rules: [
          { test: /\.svelte$/, loader: "svelte-loader" },
          {
            test: /\.worker\.(c|m)?js$/i,
            use: [
              {
                loader: "worker-loader",
                options: {
                  filename: "[name].worker.js",
                  inline: "fallback",
                },
              },
            ],
          },
          { test: /\.css$/, use: ["style-loader", "css-loader"] },
          { test: /\.(jpg|png)$/, loader: "url-loader" },
        ],
      },
    },
  ];
};
