"use strict";

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

let samples = ['Booking', 'CustomItem', 'DualView', 'GardenCalendar', 'Interactions', 'Items', 'ListView', 'MinApp', 'MonthView', 'Resources',
	'ResourceView', 'Timetable', 'Views', 'WeekView'];
let mainEntry = {
	main: './src/main.ts',
	scripts: './src/samples.ts',
	styles: './src/samples.css'
};
samples.map(name => {
	mainEntry[name] = `./src/${name}.ts`;
});

let plugins = samples.map(name => {
	return new HtmlWebpackPlugin({
		template: `./src/${name}.html`,
		filename: `${name}.html`,
		chunks: [`${name}`, 'styles', 'scripts']
	})
});

module.exports = {
	entry: mainEntry,
	output: {
		filename: '[name].js',
		chunkFilename: 'vendor.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.html']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				dependency: { not: ['url'] },
				type: 'asset/resource',
			},
			{
				test: /\.txt/,
				type: 'asset'
			},
			{
				test: /\.xml$/i,
				use: ['xml-loader'],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/main.html',
			chunks: ['main', 'styles']
		}),
		new CopyPlugin({
			patterns: [
				{ from: './src/localization', to: './localization', noErrorOnMissing: true },
				{ from: './src/assets/', to: './assets/' },
				{ from: './src/planner_lic.txt', to: './' }
			],
		})
	].concat(plugins),
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all'
		}
	},
	mode: 'development',
	devtool: 'source-map'
};