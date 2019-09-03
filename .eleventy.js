module.exports = function(config) {
    config.addPassthroughCopy('src/meetup/*/images/*');
    config.addPassthroughCopy('src/meetup/a11y/*/images/*');
    config.addPassthroughCopy('src/class/*/images/*');

    config.addFilter('htmlmin', function(value) {
        let htmlmin = require('html-minifier');
        return htmlmin.minify(
            value, {
                removeComments: true,
                collapseWhitespace: true
            }
        );
    });

    config.addTransform('xmlmin', function(content, outputPath) {
        if(outputPath && outputPath.endsWith('.xml')) {
            let prettydata = require('pretty-data');
            return prettydata.pd.xmlmin(content);
        }
        return content;
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts'
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,
        templateFormats: [
            'md'
        ],
    };
};
