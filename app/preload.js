/* global wp */
/**
 * This file has access to Electron modules and makes functions available to the web app
 */
const { contextBridge, ipcRenderer } = require( 'electron' );

contextBridge.exposeInMainWorld( 'editor', {
	save: ( filename, content ) => ipcRenderer.send( 'server:save', { filename, content } ),
	getSaveAs: () => ipcRenderer.invoke( 'server:get-save-as' ),

	onOpen: ( cb ) => ipcRenderer.on( 'editor:open', cb ),
	onSaveAs: ( cb ) => ipcRenderer.on( 'editor:save-as', cb ),
	onSave: ( cb ) => ipcRenderer.on( 'editor:save', cb ),
} );
