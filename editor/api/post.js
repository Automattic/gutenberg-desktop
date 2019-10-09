/* global electron */
/**
 * Internal dependencies
 */

import { post } from './fake-data';

const LOCAL_STORE_NAME = 'wordberg-page';

export function getAsPost( data ) {
	return {
		... getPage(),
		... data,
		content: {
			raw: data.content,
			rendered: data.content.replace( /(<!--.*?-->)/g, '' ),
		},
	};
}

export function getPage() {
	return JSON.parse( localStorage.getItem( LOCAL_STORE_NAME ) ) || post;
}

export function savePage( data ) {
	debugger;
	const { currentFilename } = electron;
	const item = getAsPost( data );

	// Get a path from Electron if we don't already have one
	const path = currentFilename || electron.getFilenameForSaving();

	if ( path ) {
		// Save the data through Electron
		electron.saveToFile( path, item );
	}

	// Also save to local store
	localStorage.setItem( LOCAL_STORE_NAME, JSON.stringify( item ) );
}

window.electron.post = {
	getAsPost,
};
