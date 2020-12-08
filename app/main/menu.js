/**
 * External dependencies
 */

const { app, Menu } = require( 'electron' );

const isMac = () => process.platform === 'darwin';

function buildMenu( menuHandler ) {
	return [
		...( isMac
			? [
					{
						label: app.getName(),
						submenu: [
							{ label: 'About', id: 'about', click: menuHandler },
							{ type: 'separator' },
							{ role: 'services' },
							{ type: 'separator' },
							{ role: 'hide' },
							{ role: 'hideothers' },
							{ role: 'unhide' },
							{ type: 'separator' },
							{ role: 'quit' },
						],
					},
			  ]
			: [] ),
		{
			label: 'File',
			submenu: [
				{
					label: 'New file',
					click: menuHandler,
					accelerator: 'CommandOrControl+N',
					id: 'new-document',
				},
				{ type: 'separator' },
				{
					label: 'Open...',
					click: menuHandler,
					accelerator: 'CommandOrControl+O',
					id: 'open',
				},
				{ type: 'separator' },
				{
					label: 'Save...',
					click: menuHandler,
					accelerator: 'CommandOrControl+S',
					id: 'save',
				},
				{
					label: 'Save as...',
					click: menuHandler,
					accelerator: 'CommandOrControl+Shift+S',
					id: 'save-as',
				},
				{
					label: 'Close',
					accelerator: 'CommandOrControl+W',
					id: 'close',
					role: 'close',
				},
			],
		},
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				...( isMac
					? [
							{ role: 'pasteAndMatchStyle' },
							{ role: 'delete' },
							{ role: 'selectAll' },
							{ type: 'separator' },
							{
								label: 'Speech',
								submenu: [ { role: 'startspeaking' }, { role: 'stopspeaking' } ],
							},
					  ]
					: [ { role: 'delete' }, { type: 'separator' }, { role: 'selectAll' } ] ),
			],
		},
		{
			label: 'View',
			submenu: [
				{ role: 'reload' },
				{ role: 'forcereload' },
				{ role: 'toggledevtools' },
				{ type: 'separator' },
				{ role: 'resetzoom' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' },
			],
		},
		{
			label: 'Window',
			submenu: [
				{ role: 'minimize' },
				{ role: 'zoom' },
				...( isMac
					? [ { type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' } ]
					: [ { role: 'close' } ] ),
			],
		},
	];
}

function setupMenu( menuHandlers, createEditor, removeEditor ) {
	const menu = Menu.buildFromTemplate(
		buildMenu( ( menuItem, browserWindow ) => {
			menuHandlers( menuItem, browserWindow, createEditor, removeEditor );
		} )
	);
	Menu.setApplicationMenu( menu );
}

module.exports = setupMenu;
