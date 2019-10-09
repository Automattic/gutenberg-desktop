/**
 * External dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './gutenbridge';
import Editor from './component/editor';

function App() {
	const [ blocks, updateBlocks ] = useState( [] );

	return (
		<Editor blocks={ blocks } updateBlocks={ updateBlocks } />
	);
}

ReactDOM.render( <App />, document.getElementById( 'root' ) );
