// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    'plugins': {
        // to edit target browsers: use "browserlist" field in package.json
        'autoprefixer': {
            browsers: ['last 2 versions', 'Android >= 4.0']
        },
        'postcss-pxtorem': {
            rootValue: 12,
            replace: false,
            propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'width', 'height', 'padding*', 'margin*', 'top', 'left', 'right', 'bottom'],
            selectorBlackList: [/^html/]
        }
    }
};
