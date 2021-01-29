module.exports = (targets) => {
  const { Targetables } = require("@magento/pwa-buildpack");

  const targetables = Targetables.using(targets);

  targetables.setSpecialFeatures("esModules");

  // Create Target API
  targetables.esModule("social-links/src/SocialLinks/socialLinksData.js", {
    publish(myTargets, self) {
      const socialLinksAPI = {
        addLink(iconName, url) {
          // Add import to the file
          const Icon = self.addImport(
            `import {${iconName}} from "react-feather"`
          );
          // Add data to the array
          self.insertBeforeSource(
            "]",
            `\n\t{ Icon: ${Icon}, url: "${url}" },\n`
          );
        },
      };
      myTargets.socialLinks.call(socialLinksAPI);
    },
  });
};
