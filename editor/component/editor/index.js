/**
 * External dependencies
 */

import React from 'react';
import { editPost, domReady } from '@frontkom/gutenberg-js';
import '@frontkom/gutenberg-js/build/css/block-library/style.css';
import '@frontkom/gutenberg-js/build/css/style.css';

/**
 * Internal dependencies
 */

import './style.css';

class Editor extends React.Component {
	componentDidMount() {
		const settings = {
			alignWide: true,
			availableTemplates: [],
			allowedBlockTypes: true,
			disableCustomColors: false,
			disablePostFormats: false,
			titlePlaceholder: '',
			bodyPlaceholder: '',
			isRTL: false,
			autosaveInterval: 0,
			postLock: {
				isLocked: false,
			},
			canPublish: false,
			canSave: true,
			canAutosave: false,
			mediaLibrary: false,
		};

		// Initialize the editor
		window._wpLoadGutenbergEditor = new Promise( resolve => {
			domReady( () => {
				resolve( editPost.initializeEditor( 'editor', 'post', 1, settings, {} ) );
			} );
		} );
	}

	render() {
		// Any additional Wordberg UI can be added here
		return (
			<div id="editor" className="gutenberg__editor"></div>
		);
	}
}

export default Editor;
