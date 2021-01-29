module.exports = (targets) => {
  // Add social links data
  targets.of("social-links").socialLinks.tap((api) => {
    api.addLink("Facebook", "https://www.facebook.com/");
  });
};
