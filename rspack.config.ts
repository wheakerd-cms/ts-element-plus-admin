import {defineConfig} from '@rspack/cli';
import {type RspackPluginFunction, rspack} from '@rspack/core';
import {VueLoaderPlugin} from 'vue-loader';
import browserslist from 'browserslist';
import * as path from "node:path";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets: string [] = browserslist();

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
	context: __dirname,
	entry: {
		main: './src/main.ts',
	},
	resolve: {
		alias: {
			'@/': path.resolve(__dirname, 'src'),
		},
		extensions: [
			'...',
			'.ts',
			'.vue',
		],
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					experimentalInlineMatchResource: true,
				},
			},
			{
				test: /\.(js|ts)$/,
				use: [
					{
						loader: 'builtin:swc-loader',
						options: {
							sourceMap: true,
							jsc: {
								parser: {
									syntax: 'typescript',
								}
							},
							env: {
								targets,
							},
						},
					},
				],
			},
			{
				test: /\.(css|s[ac]ss)$/,
				use: [
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: () => [
									require.resolve('autoprefixer'),
								],
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require.resolve('sass'),
						},
					},
				],
				type: 'css/auto',
			},
			{
				test: /\.svg/,
				type: 'asset/resource',
			}
		]
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			template: './index.html',
		}),
		new rspack.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false,
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
		}),
		new VueLoaderPlugin() as RspackPluginFunction,
	],
	devServer: {
		hot: true,
		liveReload: true,
		client: {
			overlay: true,
			progress: true,
		},
	},
	optimization: {
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin(),
			new rspack.LightningCssMinimizerRspackPlugin({
				minimizerOptions: {
					targets
				},
			}),
		],
	},
	experiments: {
		css: true,
	},
	ignoreWarnings: [/warning from compiler/, () => true],
});
