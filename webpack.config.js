var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ['./js/app.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'captorComponentsBundle.js'
    },
    module: {
        loaders:[
            // { test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/] },
            { test: /\.html$/, loader: "html-loader", exclude: [/node_modules/] },
            // {
            //     // loader: 'babel-loader',
            //     // test: path.join(__dirname, 'js'),
            //     // query: {
            //     //   presets: 'es2015',
            //     // },
            //     test: /\.js$/,
            //     exclude: [/node_modules/],
            //     loader: 'babel-loader',
            //     query: {
            //         presets: ['es2015']
            //     }
            // }
        ],
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { 
                presets: [ 
                    'es2015' 
                ] 
                }
            }
        ]
    },
     plugins: [
         new ExtractTextPlugin('../css/captorComponentsStyle.css')
    ]
};