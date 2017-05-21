var path = require('path')

module.exports = {
    entry: './index.js',
    output: {
        filename: 'hashish.js',
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
    }
}
