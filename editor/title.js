import path from 'path';

/**
 * WordPress dependencies
 */

import { useEffect } from '@wordpress/element';

function SetTitle( { filename } ) {
	useEffect( () => {
		document.title = 'Gutenberg Desktop';

		if ( filename ) {
			document.title = path.basename( filename ) + ' | ' + document.title;
		}
	}, [ filename ] );

	return null;
}

export default SetTitle;
