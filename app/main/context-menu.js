/**
 * External dependencies
 */

const contextMenu = require( 'electron-context-menu' );

function setupContext( handler ) {
	contextMenu( {
		showCopyImageAddress: true,
		showSaveImageAs: true,
		append: () => {
			return [
				{
					label: 'Copy As',
					submenu: [
						{
							label: 'Plain text',
							click: handler,
							id: 'copy-plain',
						},
						{
							label: 'Markdown',
							click: handler,
							id: 'copy-markdown',
						},
						{
							label: 'HTML',
							click: handler,
							id: 'copy-html',
						},
					],
				},
				{ type: 'separator' },
			];
		},
	} );
}

module.exports = setupContext;
