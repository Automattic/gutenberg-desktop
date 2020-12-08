const {
	saveFile,
	saveFileAs,
	openFile,
} = require( './ipc-editor' );
const showAbout = require( './about' );

const menuHandlers = ( menuItem, browserWindow, createEditor, removeEditor ) => {
	switch ( menuItem.id ) {
		case 'about':
			showAbout();
			break;

		case 'new-document':
			createEditor();
			break;

		case 'close':
			removeEditor( browserWindow );
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

		default:
			break;
	}
};

module.exports = menuHandlers;
