module.exports = function ( api ) {
	api.cache( true );

	return {
		presets: [ '@wordpress/default' ],
		plugins: [ '@emotion', 'babel-plugin-inline-json-import' ],
	};
};
