/**
 * External dependencies
 */
const { app, session } = require( 'electron' );

/**
 * Internal dependencies
 */
const menuHandlers = require( './main/menu-handlers' );
const setupMenu = require( './main/menu' );
const setupContext = require( './main/context-menu' );
const setupIpc = require( './main/ipc-server' );
const createEditor = require( './main/create-editor' );

let editorWindows = [];

function createNewEditor() {
	editorWindows.push( createEditor( app, removeEditor ) );
}

function removeEditor( editor ) {
	editorWindows = editorWindows.filter( ( item ) => item !== editor );
}

( async () => {
	await app.whenReady();

	// Create first window
	createNewEditor();

	// Set everything up
	setupIpc();
	setupMenu( menuHandlers, createNewEditor );
	setupContext( menuHandlers );

	// Disable navigation away from the editor
	app.on( 'web-contents-created', ( event, contents ) => {
		contents.on( 'will-navigate', ( event, navigationUrl ) => {
			event.preventDefault();
		} );
	} );
} )();
