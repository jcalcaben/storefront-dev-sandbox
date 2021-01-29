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

const { Targetables } = require('@magento/pwa-buildpack');

function localIntercept(targets) {
    const targetables = Targetables.using(targets);

    // Add social links data
    targets.of('social-links').socialLinks.tap(api => {
        api.addLink('Twitter', 'https://twitter.com/')
        api.addLink('Instagram', 'https://www.instagram.com/')
    })

    // Add social links component to Footer
    const Footer = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Footer/footer.js'
    );

    // Add import
    const SocialLinks = Footer.addImport('SocialLinks from "social-links"');
    const socialLinksProps = 'styles={{ root: classes.socialLinks }}';

    Footer.replaceJSX(
        'ul className={classes.socialLinks}',
        `<${SocialLinks} ${socialLinksProps} />`
    );
}

module.exports = localIntercept;
