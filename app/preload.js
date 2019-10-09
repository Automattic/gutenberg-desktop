/* global wp */
/**
 * This file has access to Electron modules and makes functions available to the web app
 */

const { remote, ipcRenderer } = require( 'electron' );
const { dialog } = remote;

let currentFilename = false;

function getFilenameForSaving() {
	return dialog.showSaveDialog( {
		title: 'Save HTML file as...',
		defaultPath: 'test.html',
		filters: [
			{ name: 'Web pages', extensions: [ 'html', 'md' ] },
		],
	} );
}

function updateDocumentTitle( title ) {
	const parts = title ? title.split( '/' ) : [];

	document.title = 'Wordberg';
	if ( parts.length > 0 ) {
		document.title = parts[ parts.length - 1 ] + ' | Wordberg';
	}
}

function setDocumentName( filename ) {
	window.electron.currentFilename = filename;
	updateDocumentTitle( filename );
}

function convertContent( content, fileType ) {
	const { pasteHandler } = wp.blocks;

	if ( content.indexOf( '<!-- wp:' ) === -1 ) {
		// Auto convert to blocks
		const blocks = pasteHandler( {
			HTML: fileType === 'html' ? content : '',
			plainText: fileType !== 'html' ? content : '',
		} );

		return wp.blocks.serialize( blocks );
	}

	// Already Gutenberg format
	return content;
}

function setDocumentContent( content ) {
	const { getAsPost } = window.electron.post;
	const newPost = getAsPost( { content } );

	localStorage.setItem( 'wordberg-page', null );

	wp.data.dispatch( 'core/editor' ).setupEditor( newPost, [] );
}

function getFiletype( filename ) {
	const parts = filename.split( '.' );

	if ( parts.length > 1 ) {
		const map = {
			md: 'markdown',
			html: 'html',
			htm: 'html',
		};

		return map[ parts[ parts.length - 1 ] ] ? map[ parts[ parts.length - 1 ] ] : 'text';
	}

	return 'text';
}

function saveToFile( filename, post ) {
	setDocumentName( filename );

	ipcRenderer.send( 'save-post', { filename, content: post.content.raw } );
}

ipcRenderer.on( 'clear', () => {
	setDocumentName( false );
	setDocumentContent( '', false );
} );

ipcRenderer.on( 'save', () => {
	wp.data.dispatch( 'core/editor' ).savePost().then( resp => console.log( resp ) ).catch( error => console.error( error ) );
} );

ipcRenderer.on( 'save-as', () => {
	setDocumentName( false ); // Force the save dialog
	wp.data.dispatch( 'core/editor' ).savePost().then( resp => console.log( resp ) ).catch( error => console.error( error ) );
} );

ipcRenderer.on( 'open', ( event, { content, filename } ) => {
	setDocumentName( filename );
	setDocumentContent( convertContent( content, getFiletype( filename ) ) );
} );

ipcRenderer.on( 'copy', ( event, type ) => {
	// Taken from copy-handler
	const { getSelectedBlockClientId, getMultiSelectedBlockClientIds, getBlocksByClientId } = wp.data.select( 'core/editor' );
	const selectedBlockClientId = getSelectedBlockClientId();
	const selectedBlockClientIds = selectedBlockClientId ? [ selectedBlockClientId ] : getMultiSelectedBlockClientIds();

	if ( selectedBlockClientIds.length > 0 ) {
		const content = wp.blocks.serialize( getBlocksByClientId( selectedBlockClientIds ) );
		const div = document.createElement( 'div' );

		div.innerHTML = content;

		ipcRenderer.send( 'copy-result', { content, type, plain: div.innerText } );
	}
} );

// Expose this for the web renderer
window.electron = {
	getFilenameForSaving,
	saveToFile,
	currentFilename,
	post: {}, // Filled in by the web renderer
};
