const path = require( 'path' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
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
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ],
			},
			{
				test: /\.(js|mjs)$/,
				exclude: /node_modules/,
				loader: 'babel-loader?cacheDirectory',
			},
		],
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		tinymce: 'tinymce',
		moment: 'moment',
		jquery: 'jQuery',
		lodash: 'lodash',
		'lodash-es': 'lodash',
	},
    plugins: [
		new HtmlWebpackPlugin( {
			title: 'Wordberg',
			template: path.join( 'editor', 'index.ejs' ),
			hash: true,
		} ),
		new webpack.DefinePlugin( {
			'process.env': { NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' ) },
		} ),
        new CopyWebpackPlugin([
            { from: 'node_modules/tinymce/plugins', to: './plugins' },
            { from: 'node_modules/tinymce/themes', to: './themes' },
			{ from: 'node_modules/tinymce/skins', to: './skins' },
			{ from: 'node_modules/jquery/dist/jquery.js', to: './vendor/jquery.js' },
			{ from: 'node_modules/react/umd/react.development.js', to: './vendor/react.js' },
			{ from: 'node_modules/react-dom/umd/react-dom.development.js', to: './vendor/react-dom.js' },
			{ from: 'node_modules/moment/min/moment.min.js', to: './vendor/moment.js' },
        ], {}),
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
