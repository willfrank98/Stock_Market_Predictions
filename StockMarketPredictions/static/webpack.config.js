const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry:  {
		bundle: __dirname + '/components/index.jsx',
		style: __dirname + '/components/style.jsx'
	},
	// plugins: [
	// 	new CleanWebpackPlugin(),
	// 	new HtmlWebpackPlugin({
	// 		title: 'Caching',
	// 	}),
	// ],
	output: {
        path: __dirname + '/dist',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						],
					}
				}
			},
			{
				test: /\.css$/,
      			use: ['style-loader', 'css-loader']
			}
		]
	}
};
module.exports = config;