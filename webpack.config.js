const argv = require('yargs-parser')(process.argv.slice(2));
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlAfterWebpackPlugin = require('./config/html-after-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
    join
} = require("path");


let webpackConfig = {
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            })
        }, {
            test: /\.js$/,
            use: [{
                loader: "babel-loader"
            }]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: "/",
        filename: "scripts/[name].bundle.js"
    },
    resolve: {
        extensions: [".vue", ".js", ".es", ".css"]
    }
}

module.exports = webpackConfig;