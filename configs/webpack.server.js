const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './server/index.ts',

    output: {
        publicPath: '/',
        path: path.resolve('./dist/server'),
        filename: 'index.js',
    },

    externals: [
        nodeExternals()
    ],

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
};
