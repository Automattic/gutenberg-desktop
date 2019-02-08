const fs = require( 'fs' );
const { dialog } = require( 'electron' );

function newDocument( win ) {
	win.webContents.send( 'clear' );
}

function saveFile( win ) {
	win.webContents.send( 'save' );
}

function saveFileAs( win ) {
	win.webContents.send( 'save-as' );
}

function openFile( win ) {
	const file = dialog.showOpenDialog( {
		title: 'Open HTML or Markdown file',
		filters: [
			{ name: 'Web pages', extensions: [ 'html', 'md' ] },
		],
	} );

	if ( file && file.length > 0 ) {
		fs.readFile( file[ 0 ], 'utf-8', ( err, data ) => {
			if ( err ) {
				console.error( err );
				return;
			}

			win.webContents.send( 'open', { content: data.trim( '\n' ), filename: file[ 0 ] } );
		} );
	}
}

function copyText( win, type ) {
	win.send( 'copy', type );
}

const menuHandlers = ( menuItem, browserWindow ) => {
	switch ( menuItem.id ) {
		case 'new-document':
			newDocument( browserWindow );
			break;

		case 'save':
			saveFile( browserWindow );
			break;

		case 'save-as':
			saveFileAs( browserWindow );
			break;

		case 'open':
			openFile( browserWindow );
			break;

		case 'copy-plain':
			copyText( browserWindow, 'plain' );
			break;

		case 'copy-markdown':
			copyText( browserWindow, 'markdown' );
			break;

		case 'copy-html':
			copyText( browserWindow, 'html' );
			break;

		default: break;
	}
};

module.exports = menuHandlers;
