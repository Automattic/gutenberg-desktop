const path = require( 'path' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const config = {
	entry: './editor/index.js',
	output: {
		filename: 'editor.build.js',
		path: path.resolve( __dirname, 'app' ),
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.scss|\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.scss', '.css' ],
		alias: {
			path: require.resolve( 'path-browserify' ),
		},
		//symlinks: true,
	},
	plugins: [
		new HtmlWebpackPlugin( {
			title: 'Gutenberg Desktop',
			template: path.join( 'editor', 'index.ejs' ),
			hash: true,
		} ),
		new webpack.DefinePlugin( {
			'process.env': { NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' ) },
		} ),
		new MiniCssExtractPlugin( {
			filename: 'editor.build.css',
		} ),
		new CopyWebpackPlugin( {
			patterns: [
				{ from: 'node_modules/react/umd/react.development.js', to: './vendor/react.js' },
				{ from: 'node_modules/react-dom/umd/react-dom.development.js', to: './vendor/react-dom.js' },
			],
		} ),
		new webpack.ProvidePlugin( {
			process: 'process/browser',
		} ),
	],
};

if ( process.env.NODE_ENV === 'development' ) {
	config.devtool = 'inline-source-map';
	config.devServer = {
		historyApiFallback: {
			index: '/',
		},
		headers: { 'Access-Control-Allow-Origin': '*' },
		stats: {
			colors: true,
			hash: false,
			version: true,
			timings: true,
			assets: true,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: true,
			errorDetails: true,
			warnings: false,
			publicPath: false,
		},
		disableHostCheck: true,
	};
}

module.exports = config;
