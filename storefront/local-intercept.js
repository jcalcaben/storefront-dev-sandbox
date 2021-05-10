const { Targetables } = require('@magento/pwa-buildpack')

module.exports = targets => {
    const targetableFactory = Targetables.using(targets);

    // Create a TargetableModule instance that points to the main.js source
    const MainComponent = targetableFactory.module(
        '@magento/venia-ui/lib/components/Main/main.js'
    );

    // Insert a console log message in the source
    MainComponent.insertAfterSource(
        'const Main = props => {\n',
        '\tconsole.log("Hello World");\n'
    );

  MainComponent.spliceSource({
    after: 'export default Main;',
    insert: ' // Exports the main component'
  })

  MainComponent.spliceSource({
    before: 'props =>',
    remove: 5,
    insert: '({ children, isMasked, propClasses })'
  })

  MainComponent.spliceSource({
    before: '    const { children, isMasked }',
    remove: 42
  })

  MainComponent.spliceSource({
    after: 'mergeClasses(defaultClasses, ',
    remove: 7,
    insert: 'propC'
  })

}
