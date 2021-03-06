/**
 * Webpack configuration: builds client application to static/client
 */
const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'client/app');
const BUILD_DIR = path.resolve(__dirname, 'static/client/js');

const config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            // Extract css files
            {test: /\.css$/, loader: "style-loader!css-loader"},
            // all images in main bundle
            {test: /\.(png|jpg)$/, loader: "url-loader"},
            // babel
            {test: /\.jsx?/, include: APP_DIR, loader: 'babel'},
            // fonts
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file?name=static/assets/fonts/[name].[ext]'
            }
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.jsx', '.json']
    }
};

module.exports = config;
