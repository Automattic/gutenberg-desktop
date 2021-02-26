const fs = require( 'fs' );
const { dialog } = require( 'electron' );
const MarkdownIt = require( 'markdown-it' );

/**
 * These IPC commands go to the web renderer containing Gutenberg Desktop and Gutenberg. They are actioned upon by the `preload.js` script.
 */

function convertContent( content, fileType ) {
	if ( fileType === 'md' ) {
		const md = new MarkdownIt();
		return md.render( content );
	}

	return content;
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

function getFilenameForSaving( defaultPath ) {
	return dialog.showSaveDialog( {
		title: 'Save HTML file as...',
		defaultPath: defaultPath ?? '',
		filters: [ { name: 'Web pages', extensions: [ 'html', 'md' ] } ],
		message: 'Save as .html or .md',
	} );
}

function saveFile( win ) {
	win.webContents.send( 'editor:save' );
}

function saveFileAs( win ) {
	getFilenameForSaving()
		.then( ( { filePath, canceled } ) => {
			if ( canceled ) {
				return;
			}

			win.webContents.send( 'editor:save-as', { filename: filePath } );
		} )
		.catch( ( error ) => {
			console.error( error );
		} );
}

function openFile( win ) {
	dialog
		.showOpenDialog( {
			title: 'Open HTML or Markdown file',
			filters: [ { name: 'Web pages', extensions: [ 'html', 'md' ] } ],
		} )
		.then( ( results ) => {
			if ( ! results.canceled ) {
				fs.readFile( results.filePaths[ 0 ], 'utf-8', ( err, data ) => {
					if ( err ) {
						console.error( err );
						return;
					}

					const fileType = getFiletype( results.filePaths[ 0 ] );

					win.webContents.send( 'editor:open', {
						content: convertContent( data.trim(), fileType ),
						filename: results.filePaths[ 0 ],
						fileType,
					} );
				} );
			}
		} );
}

module.exports = {
	openFile,
	saveFile,
	saveFileAs,
	getFilenameForSaving,
};
