/**
 * External dependencies
 */

const { ipcMain, clipboard } = require( 'electron' );
const fs = require( 'fs' );
const TurndownService = require( 'turndown' );

function convertContentForFilename( filename, content ) {
	if ( filename.substr( -3 ) === '.md' ) {
		const service = new TurndownService();

		return service.turndown( content ) + '\n';
	}

	return content;
}

function convertHtml( html, type, plain ) {
	if ( type === 'plain' ) {
		return plain.replace( /\n\n\n/g, '\n' );
	} else if ( type === 'markdown' ) {
		const service = new TurndownService();

		return service.turndown( html ) + '\n';
	}

	return html;
}

ipcMain.on( 'save-post', ( event, { filename, content } ) => {
	fs.writeFile( filename, convertContentForFilename( filename, content ), err => {
		if ( err ) {
			console.error( err );
		}
	} );
} );

ipcMain.on( 'copy-result', ( event, { content, type, plain } ) => {
	clipboard.writeText( convertHtml( content, type, plain ) );
} );
