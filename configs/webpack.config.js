const path = require('path');

module.exports = {
    entry: './src/Root.tsx',

    output: {
        path: path.resolve('./static/dist/'),
        publicPath: '/dist/',
        libraryExport: 'default',
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
            '@components': path.resolve('src/components'),
            '@features': path.resolve('src/features'),
            '@lib': path.resolve('src/lib'),
            '@const': path.resolve('src/const'),
            '@typings': path.resolve('typings'),
        }
    },

    devServer: {
        contentBase: path.join('./static/'),
        compress: true,
        port: 9000
    },

    module: {
        rules: [
            {
                test: /\.(jsx|tsx|ts)?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        query: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
};
