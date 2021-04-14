/**
 * External dependencies
 */
const { BrowserWindow } = require( 'electron' );
const path = require( 'path' );

function createEditor( app, cleanUp ) {
	// Create the browser window.
	const appWindow = new BrowserWindow( {
		width: 1000,
		height: 800,
		minWidth: 400,
		minHeight: 400,
		webPreferences: {
			// nodeIntegration: true,
			// contextIsolation: false,
			preload: path.join( app.getAppPath(), 'preload.js' ),
		},
	} );

	// and load the index.html of the app.
	appWindow.loadFile( path.resolve( __dirname, '..', 'index.html' ) );

	// Auto-open inspector if in dev mode
	process.env.NODE_ENV === 'development' && appWindow.webContents.openDevTools();

	// Cleanup closed windows
	appWindow.on( 'closed', function() {
		cleanUp( appWindow );
	} );

	return appWindow;
}

module.exports = createEditor;
