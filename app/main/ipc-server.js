/**
 * External dependencies
 */

const { ipcMain } = require( 'electron' );
const fs = require( 'fs' );
const TurndownService = require( 'turndown' );

const { getFilenameForSaving } = require( './ipc-editor' );

function convertContentForFilename( filename, content ) {
	if ( filename.substr( -3 ) === '.md' ) {
		const service = new TurndownService();

		return service.turndown( content ) + '\n';
	}

	return content;
}

function setupIpc() {
	/**
	 * This is sent by the editor
	 */
	ipcMain.on( 'server:save', ( event, { filename, content } ) => {
		fs.writeFile( filename, convertContentForFilename( filename, content ), ( err ) => {
			if ( err ) {
				console.error( err );
			}
		} );
	} );

	ipcMain.handle( 'server:get-save-as', ( event ) => {
		return getFilenameForSaving().then( ( details ) => {
			if ( details.canceled ) {
				return null;
			}

			return details.filePath;
		});
	} );
}

module.exports = setupIpc;
