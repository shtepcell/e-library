const path = require('path');

module.exports = {
    entry: './server/index.ts',

    output: {
        publicPath: '/',
        path: path.resolve('./dist/server'),
        filename: 'index.js',
    },

    target: 'node',

    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                include: path.resolve('./'),
                loader: require.resolve('babel-loader'),
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    compact: false,
                },
            },
        ]
    }
}