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

function localIntercept(targets) {
    const { Targetables } = require('@magento/pwa-buildpack');

    const targetables = Targetables.using(targets);

    const ProductDetails = targetables.reactComponent(
        '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js'
    );

    const TagList = ProductDetails.addImport("{TagList} from 'tagList'");

    ProductDetails.insertAfterJSX(
        '<RichText content={productDetails.description} />',
        `<${TagList} categoriesListData={productDetails.categoriesListData} />`
    );
    const useProductFullDetails = targetables.esModule(
        '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail.js'
    );

    useProductFullDetails.wrapWithFile(
        'useProductFullDetail',
        'tagList/src/targets/wrapper'
    );
}

module.exports = localIntercept;
