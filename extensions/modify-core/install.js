module.exports = (targetables) => {
  // Create a TargetableModule instance that points to the main.js source
  const MainComponent = targetables.module(
    "@magento/venia-ui/lib/components/Main/main.js"
  );

  // Insert a console log message in the source
  MainComponent.insertAfterSource(
    "const Main = props => {\n",
    '\tconsole.log("Hello World");\n'
  );
};
