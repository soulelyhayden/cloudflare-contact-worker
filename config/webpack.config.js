const path = require('path')
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: path.join(__dirname, '../src/index.ts'),
	mode: 'production',
	optimization: {
		minimize: false
	},
	output: {
		filename: 'workerContactForm.js',
		path: path.join(__dirname, '../dist'),
	},
	plugins: [
		new Dotenv({ path: path.join(__dirname, './config.env' )})
	],
	// devtool: 'eval-cheap-module-source-map',
	watchOptions: {
		ignored: /node_modules|dist|\.js/g,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{
					loader: 'ts-loader',
					options: {
						configFile: "../tsconfig.json" // VSCode doesn't yet support tsconfig in sub dir
					}
				}],
				exclude: /node_modules/,
			},
		],
	},
};