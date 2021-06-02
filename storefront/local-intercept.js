const { Targetables } = require('@magento/pwa-buildpack')

module.exports = targets => {
    const targetables = Targetables.using(targets);

    // Create a TargetableModule instance that points to the main.js source
    const MainComponent = targetables.module(
        '@magento/venia-ui/lib/components/Main/main.js'
    );

    /**
     * Example from: https://pwastudio.io/tutorials/targetables/#create-targetable-objects
     */

    // Insert a console log message in the source
    MainComponent.insertAfterSource(
        'const Main = props => {\n',
        '\tconsole.log("Hello World");\n'
    );

}