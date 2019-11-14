const webpack = require('webpack');

const config = {
    entry:  {
		bundle: __dirname + '/components/index.jsx',
		style: __dirname + '/components/style.jsx'
	},
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