/**
 * WordPress dependencies
 */

import { render } from '@wordpress/element';
import IsolatedBlockEditor from 'isolated-block-editor';

/**
 * Internal dependencies
 */

import GutenbergDesktop from './gutenberg-desktop';
import './style.scss';

const settings = {
	iso: {
		toolbar: {
			inspector: true,
			toc: true,
		},
		moreMenu: false,
		blocks: {
			disallowBlocks: [
				'core/page-break',
				'core/html',
				'core/next-page',
				'core/more',
				'core/embed',
				'core/shortcode',
				'core/archives',
				'core/calendar',
				'core/categories',
				'core/custom',
				'core/latest-comments',
				'core/latest-posts',
				'core/rss',
				'core/social',
				'core/tag-cloud',
				'core/search',
				'core/social-link',
				'core/social-links',
				'core/file',
			],
		},
	},
};

render(
	<IsolatedBlockEditor settings={ settings } onError={ () => document.location.reload() }>
		<GutenbergDesktop />
	</IsolatedBlockEditor>,
	document.querySelector( '#root' )
);
