/**
 * WordPress dependencies
 */

import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { pasteHandler, serialize } from '@wordpress/blocks';

const editor = window.editor;

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
		editor.save( filename, serialize( getBlocks() || [] ) );
	}

	function save() {
		if ( gutenbergDesktopFilename ) {
			editor.save( gutenbergDesktopFilename, serialize( getBlocks() || [] ) );
			return;
		}

		editor.getSaveAs().then( ( filePath ) => {
			if ( filePath ) {
				saveAs( filePath );
			}
		} );
	}

	useEffect( () => {
		editor.onOpen( ( event, details ) => {
			setFilename( details.filename );
			resetBlocks( convertToBlocks( details.content, details.fileType ) );
		} );

		editor.onSaveAs( ( event, details ) => {
			saveAs( details.filename );
		} );

		editor.onSave( save );
	}, [] );

	useEffect( () => {
		window.gutenbergDesktopFilename = filename;
	}, [ filename ] );

	return null;
}

export default EditorIpc;
