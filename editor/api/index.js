/**
 * Internal dependencies
 */

import { types, users, taxonomies, themes } from './fake-data.js';
import { getPage, savePage } from './post';

const isPost = RegExp( '/wp/v2/posts/(\d*)' );
const isAutoSave = RegExp( '/wp/v2/posts/(\d*)/autosaves' );
const isType = RegExp( '/wp/v2/types/\w' );

const apiFetch = async options => {
	const { method, path, data } = options;
	const [ route ] = path.split( '?' );
console.log( route );
	// Types
	if ( route === '/wp/v2/types' ) {
		return types;
	}

	if ( route === '/wp/v2/types/wp_block' ) {
		return {
			description: '',
			hierarchical: false,
			name: 'Blocks',
			rest_base: 'blocks',
			slug: 'wp_block',
			taxonomies: [],
			_links: {
			},
		};
	}

	if ( route === '/wp/v2/types/post' || isType.test( route ) ) {
		return types.post;
	}

	if ( route === '/wp/v2/blocks' ) {
		return [];
	}

	// Posts
	if ( route === '/wp/v2/posts' ) {
		return [ getPage() ];
	}

	if ( route === '/wp/v2/media' && method === 'OPTIONS' ) {
		return {
			headers: {
				get( value ) {
					if ( value === 'allow' ) {
						return [ 'POST' ];
					}
				},
			},
		};
	}

	if ( route === '/wp/v2/users' ) {
		return users;
	}

	if ( route === '/wp/v2/taxonomies' ) {
		return taxonomies;
	}

	if ( route === '/wp/v2/themes' ) {
		return themes;
	}

	if ( isPost.test( route ) || isAutoSave.test( route ) ) {
		debugger;
		if ( ( method === 'POST' || method === 'PUT' ) && data ) {
			savePage( options.data );
		}

		return getPage();
	}
debugger;
	console.warn( 'Unmatched route: ', method || 'GET', path, data );
	return {};
};

export default apiFetch;
