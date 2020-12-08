/* global wp */
/**
 * This file has access to Electron modules and makes functions available to the web app
 */

const { ipcRenderer } = require( 'electron' );

// Make this available to React
window.ipcRenderer = ipcRenderer;
