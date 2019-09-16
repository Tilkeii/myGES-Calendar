const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env, args) => {
    return merge(common(env), {
        mode: 'production',
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    });
}