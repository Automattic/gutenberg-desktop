/**
 * External dependencies
 */

import React from 'react';
//import '@wordpress/editor'; // This shouldn't be necessary

import {
	BlockList,
	WritingFlow,
	ObserveTyping,
} from '@wordpress/block-editor';
import { EditorProvider, ErrorBoundary } from '@wordpress/editor';
import Header from './header';
import { Popover } from '@wordpress/components';
import { registerCoreBlocks } from '@wordpress/block-library';
import '@wordpress/format-library';

/**
 * Internal dependencies
 */
//import './style.scss';

/* eslint-disable no-restricted-syntax */
import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/editor.css';
import '@wordpress/block-library/build-style/theme.css';
import '@wordpress/format-library/build-style/style.css';

/**
 * Internal dependencies
 */

import './style.scss';

registerCoreBlocks();

// XXX block sidebar thing
class Editor extends React.Component {
	constructor( props ) {
		super( props );
	}

	getPost() {
		return {
			type: 'post',
			id: 1,
			content: {
				raw: '',
				rendered: '',
			},
		};
	}

	getSettings() {
		return {
			alignWide: true,
			availableTemplates: [],
			allowedBlockTypes: true,
			disableCustomColors: false,
			disablePostFormats: false,
			titlePlaceholder: '',
			bodyPlaceholder: 'Enter your content',
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
	}

	onError() {
		return (
			<p>Error</p>
		);
	}

	render() {
		return (
			<div id="editor" className="gutenberg__editor">
				<EditorProvider
					settings={ this.getSettings() }
					post={ this.getPost() }
					initialEdits={ [] }
				>
					<ErrorBoundary onError={ this.onError }>
						<div className="editor-styles-wrapper">
							<Header />
							<WritingFlow>
								<ObserveTyping>
									<BlockList />
								</ObserveTyping>
							</WritingFlow>
						</div>
						<Popover.Slot />
					</ErrorBoundary>
				</EditorProvider>
			</div>
		);
	}
}

export default Editor;
