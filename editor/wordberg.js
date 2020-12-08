/**
 * WordPress dependencies
 */

import { useState } from '@wordpress/element';

import SetTitle from './title';
import EditorIpc from './ipc';

function Wordberg() {
	const [ currentFilename, setCurrentFilename ] = useState( null );

	return (
		<>
			<SetTitle filename={ currentFilename } />
			<EditorIpc filename={ currentFilename } setFilename={ setCurrentFilename } />
		</>
	);
}

export default Wordberg;
