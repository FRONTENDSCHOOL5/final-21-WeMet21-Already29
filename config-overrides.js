const webpack = require("webpack");

module.exports = function override(config) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      options: {
        headers: {
          "Permissions-Policy": "interest-cohort=()",
        },
      },
    })
  );

  return config;
};
