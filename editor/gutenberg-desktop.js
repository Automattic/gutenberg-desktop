/**
 * WordPress dependencies
 */

import { useState } from '@wordpress/element';

import SetTitle from './title';
import EditorIpc from './ipc';

function GutenbergDesktop() {
	const [ currentFilename, setCurrentFilename ] = useState( null );

	return (
		<>
			<SetTitle filename={ currentFilename } />
			<EditorIpc filename={ currentFilename } setFilename={ setCurrentFilename } />
		</>
	);
}

export default GutenbergDesktop;
