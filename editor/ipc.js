/**
 * WordPress dependencies
 */

import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { pasteHandler, serialize } from '@wordpress/blocks';

const { ipcRenderer } = window;

/**
 * Convert HTML to blocks
 *
 * @param {String} content HTML content
 * @param {String} fileType File type
 * @returns object[]
 */
function convertToBlocks( content, fileType = 'html' ) {
	const isSupportedHtml = fileType === 'html' || fileType === 'md';

	// Auto convert to blocks
	return pasteHandler( {
		HTML: isSupportedHtml ? content : '',
		plainText: ! isSupportedHtml ? content : '',
	} );
}

// Not sure why, but the filename is not updating when bound in an ipcRenderer callback. For now doing this hack
window.gutenbergDesktopFilename = '';

function EditorIpc( { filename, setFilename } ) {
	const { resetBlocks } = useDispatch( 'core/block-editor' );
	const { getBlocks } = useSelect(
		( select ) => ( {
			getBlocks: select( 'isolated/editor' ).getBlocks,
		} ),
		[]
	);

	function saveAs( filename ) {
		setFilename( filename );
		ipcRenderer.send( 'server:save', { filename, content: serialize( getBlocks() || [] ) } );
	}

	function save() {
		if ( gutenbergDesktopFilename ) {
			ipcRenderer.send( 'server:save', { filename: gutenbergDesktopFilename, content: serialize( getBlocks() || [] ) } );
			return;
		}

		ipcRenderer.invoke( 'server:get-save-as' ).then( ( filePath ) => {
			if ( filePath ) {
				saveAs( filePath );
			}
		} );
	}

	useEffect( () => {
		ipcRenderer.on( 'editor:open', ( event, details ) => {
			setFilename( details.filename );
			resetBlocks( convertToBlocks( details.content, details.fileType ) );
		} );

		ipcRenderer.on( 'editor:save-as', ( event, details ) => {
			saveAs( details.filename );
		} );

		ipcRenderer.on( 'editor:save', save );
	}, [] );

	useEffect( () => {
		window.gutenbergDesktopFilename = filename;
	}, [ filename ] );

	return null;
}

export default EditorIpc;
