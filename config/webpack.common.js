const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
require('dotenv').config();
const srcDir = '../src/';

module.exports = {
    entry: {
        background: path.join(__dirname, srcDir + 'background.ts'),
        content: path.join(__dirname, srcDir + 'content.ts'),
        popup: path.join(__dirname, srcDir + 'popup.ts')
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, '../dist/js'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {
                from: '.',
                to: '..',
                context: 'public',
                ignore: ['manifest.json']
            }
        ]),
        new CopyPlugin([
            {
                from: 'manifest.json',
                to: '..',
                context: 'public',
                transform(content, path) {
                    return content
                        .toString()
                        .replace('__GOOGLE_CLIENT_ID__', process.env.GOOGLE_CLIENT_ID);
                },
            }
        ])
    ]

};