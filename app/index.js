/**
 * External dependencies
 */
const { app, BrowserWindow } = require( 'electron' );
const path = require( 'path' );

/**
 * Internal dependencies
 */
const menuHandlers = require( './main/menu-handlers' );
const setupMenu = require( './main/menu' );
const setupContext = require( './main/context-menu' );

require( './main/ipc' );

let appWindow;

function createWindow() {
	// Create the browser window.
	appWindow = new BrowserWindow( {
		width: 1200,
		height: 768,
		webPreferences: {
			nodeIntegration: false,
			preload: path.resolve( __dirname, 'preload.js' ),
		},
	} );

	// and load the index.html of the app.
	if ( process.env.NODE_ENV === 'development' ) {
		appWindow.loadURL( 'http://localhost:3312' );
	} else {
		appWindow.loadFile( path.resolve( __dirname, 'index.html' ) );
	}

	//appWindow.webContents.openDevTools();

	appWindow.webContents.on( 'new-window', function( event ) {
		event.preventDefault();
		return;
	} );

	return appWindow;
}

( async () => {
	await app.whenReady();

	appWindow = createWindow();
	setupMenu( menuHandlers );
	setupContext( menuHandlers );
} )();
