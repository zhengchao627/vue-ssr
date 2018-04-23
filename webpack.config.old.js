const argv = require('yargs-parser')(process.argv.slice(2));
const glob = require('glob');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlAfterWebpackPlugin = require('./config/html-after-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { join } = require("path");
const del = require('del');

//打包前删除打包目录
del.sync([`${__dirname}/dist`]);

let files = glob.sync(__dirname + "/src/webapp/views/**/*.entry.js");
const webpackConfig = require(__dirname + `/config/webpack.${argv.mode}.js`);

let _entry = {};

for (let item of files) {
    item.replace(/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g, (match, $1, $2) => {
        //match 匹配前的字符串
        //$1正则组（匹配的一个括号内的） $2-->第二组
        _entry[$1] = item;
    });
}

let _webpackConfig = {
    entry: _entry,
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
        }]
    },
    optimization: {
        //原CommonsChunkPlugin配置
        splitChunks: {
            cacheGroups: {
                common: {
                    //test: resolve(__dirname, "node_modules"), // 路径在 node_modules 目录下的都作为公共部分
                    chunks: 'all',
                    // test: /\.(js)$/,
                    name: 'common',
                     minChunks: 2
                },
                // styles: {
                //     name: 'styles',
                //     test: /\.(scss|css)$/,
                //     chunks: 'all',
                //     minChunks: 2,
                //     reuseExistingChunk: true,
                //     enforce: true
                // }

            }
        },
        runtimeChunk: { name: 'runtime' }
    },
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: "/",
        filename: "scripts/[name].bundle.js"
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: "./src/webapp/views/common",
            to: "../views/common"
        },{
            from: "./src/webapp/widgets/**/*.html",//如果直接加**/* 会拷贝全目录
            to: "../widgets/[name]/[name].html",
            toType: 'template'
        }]),
        new HtmlWebpackPlugin({
            filename: "../views/users/pages/index.html",
            template: "./src/webapp/views/users/pages/index.html",
            chunks: ["users-index", "common"],
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: "../views/hello/pages/index.html",
            template: "./src/webapp/views/hello/pages/index.html",
            chunks: ["hello-index", "common"],
            inject: false
        }),
        new htmlAfterWebpackPlugin()
    ]
}

module.exports = merge(_webpackConfig, webpackConfig);