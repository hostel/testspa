const cssVariables = require('./src/constants/cssVariables.json');

module.exports = {
    plugins: {
        'postcss-normalize': {},
        'postcss-nested': {},
        'postcss-css-variables': {
            variables: cssVariables,
        },
        'postcss-hexrgba': {},
        'postcss-custom-media': {
            importFrom: cssVariables,
        },
    },
};
