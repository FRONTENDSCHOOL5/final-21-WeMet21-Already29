module.exports = function override(config) {
  config.headers = {
    ...config.headers,
    "Permissions-Policy": "interest-cohort=()",
  };
  return config;
};
