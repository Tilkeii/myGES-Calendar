const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();
const srcDir = '../src/';

module.exports = env => {
    return {
        entry: {
            background: path.join(__dirname, srcDir + 'background.ts'),
            content: path.join(__dirname, srcDir + 'content.ts'),
            popup: path.join(__dirname, srcDir + 'popup.ts')
        },
        output: {
            filename: 'js/[name].bundle.js',
            path: path.join(__dirname, '../dist'),
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        env.development == true
                            ? 'vue-style-loader'
                            : MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.vue'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin([
                {
                    from: '.',
                    to: '.',
                    context: 'public',
                    ignore: ['manifest.json', 'popup.html']
                }
            ]),
            new CopyPlugin([
                {
                    from: 'manifest.json',
                    to: '.',
                    context: 'public',
                    transform(content, path) {
                        return content
                            .toString()
                            .replace('__GOOGLE_CLIENT_ID__', process.env.GOOGLE_CLIENT_ID)
                            .replace('__URL_MYGES_TOKEN__', process.env.URL_MYGES_TOKEN);
                    },
                }
            ]),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            }),
            new Dotenv(),
            new HtmlWebpackPlugin({
                filename: 'popup.html',
                template: path.join(__dirname, '../public/popup.html'),
                chunks: ['popup', 'vendors~popup']
            }),
            new VueLoaderPlugin()
        ]
    }
};