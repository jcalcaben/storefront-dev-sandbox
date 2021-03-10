/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

// Import the Targetables manager
const { Targetables } = require('@magento/pwa-buildpack');

function localIntercept(targets) {
    // Create a bound Targetable factory
    const targetables = Targetables.using(targets);

    // Create a React component targetable linked to the productFullDetail.js file
    const ProductDetails = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );

    // Add an import statement to the productFullDetail.js file and
    // return the SingleImportStatement object
    const TagList = ProductDetails.addImport("{TagList} from 'tagList'");

    // Insert the TagList component after the product description and pass in the
    // new categoriesListData object added to the useProductFullDetails() hook
    ProductDetails.insertAfterJSX(
        '<RichText content={productDetails.description} />',
        `<${TagList} categoriesListData={productDetails.categoriesListData} />`
    );

    // Create an ES Module targetable linked to the useProductFullDetail.js file
    const useProductFullDetails = targetables.esModule(
        '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail.js'
    );

    // Wrap the useProductFullDetail hook with your extension's wrapper file
    useProductFullDetails.wrapWithFile(
        'useProductFullDetail',
        'tagList/src/targets/wrapper'
    );

    targets.of('@magento/pwa-buildpack').transformUpward.tap(def => {
        def.veniaStaticIncludes.directory.inline = './static';
        def.staticFromRoot.inline.body.file.template.inline =
            './static/{{ filename }}';
    });
}

module.exports = localIntercept;
