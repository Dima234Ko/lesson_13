const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts', // Убедитесь, что ваш входной файл указан правильно
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Обрабатываем .ts и .tsx файлы
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        historyApiFallback: true,
    },
};
