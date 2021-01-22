module.exports = (targets) => {
  const builtins = targets.of("@magento/pwa-buildpack");
  builtins.specialFeatures.tap((featuresByModule) => {
    featuresByModule["tagList"] = {
      // Wrapper modules must be ES Modules
      esModules: true,
      cssModules: true,
    };
  });
};
