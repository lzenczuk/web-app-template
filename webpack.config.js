const webpack = require('webpack');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(gitRevisionPlugin.version()),
            'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
        }),
        new CopyPlugin([
            { from: 'pbf', to: 'pbf' }
        ])
    ],
    entry: {
        js: ['@babel/polyfill', './src/index.js'],
        vendor: ['react']
    },
};
