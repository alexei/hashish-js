const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './index.js',
    output: {
        filename: 'hashish.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'hashish'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new UnminifiedWebpackPlugin()
    ]
}
