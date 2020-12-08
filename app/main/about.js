/**
 * External dependencies
 */
const { BrowserWindow, shell } = require( 'electron' );
const path = require( 'path' );

let appWindow = null;

function showAbout() {
	if ( appWindow !== null ) {
		appWindow.show();
		return;
	}

	// Create the browser window.
	appWindow = new BrowserWindow( {
		width: 400,
		height: 400,
		minWidth: 400,
		minHeight: 400,
		webPreferences: {
			enableRemoteModule: false,
			nodeIntegration: false,
		},
	} );

	appWindow.setResizable( false );

	// and load the index.html of the app.
	appWindow.loadFile( path.resolve( __dirname, '..', 'about.html' ) );

	// Open links in the browser
	appWindow.webContents.on( 'new-window', function ( e, url ) {
		e.preventDefault();
		shell.openExternal( url );
	} );

	// Cleanup closed windows
	appWindow.on( 'closed', function () {
		appWindow = null;
	} );
}

module.exports = showAbout;
