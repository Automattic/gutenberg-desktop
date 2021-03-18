# Gutenberg Desktop

<img width="1280" src="build/banner-1544x500.png">

What happens when Gutenberg and Electron are mashed together.

As with other Electron apps there are two basic components:
- The main app, running inside Electron. This provides the native side of things, and starts the web renderer
- The web renderer, where the web app runs.

Communication between the two parts is through the functions exposed in `preload.js`

Note that this is a proof of concept.

The extension uses the [Isolated Block Editor](https://github.com/Automattic/isolated-block-editor/). This can also be found in:
- [Plain Text Editor](https://github.com/Automattic/isolated-block-editor/src/browser/README.md) - standalone JS file that can replace any `textarea` on any page with a full Gutenberg editor
- [Gutenberg Everywhere](https://github.com/Automattic/gutenberg-everywhere/) - a WordPress plugin to add Gutenberg to comments, WP admin pages, bbPress, and BuddyPress
- [Gutenberg Chrome Extension](https://github.com/Automattic/gutenberg-everywhere-chrome/) - a Chrome extension that allows Gutenberg to be used on any page
- [P2](https://wordpress.com/p2/) - WordPress as a collaborative workspace (coming soon for self-hosted)
- Editor Block - a block that allows an editor to be added to a page (coming soon)


## Directories

- `app` - Contains the full app, including main Electron code and the compiled web app
  Most of the files here are copied or compiled, except:
  - `index.js` - The entry point to the Electron, which loads `index.html` inside the web renderer
  - `preload.js` - Loaded by the web renderer, but with access to Electron
- `editor` - contains the web renderer app. This is where Gutenberg lives
- `build` - Contains packaging files for the distribution
- `dist` - Contains distribution files

# Development

You can start the app in development mode by running both of these commands:

- `yarn start-editor` - this will start webpack in development mode, and any changes will be auto-compiled
- `yarn start` - this starts Electron, and points it at the development webpack

Hot reloading is not enabled yet and you may need to reload pages.

Note that any changes to the main Electron code will require Electron to be restarted.

# Production

To get a production copy:

- `yarn build-editor` - builds `app/editor.build.js`, which is bundled with the main Electron app
- `yarn start` - start Electron and points it at `app/editor.build.js`

# Packaging for distribution

- `yarn build-editor` - make sure we have the latest code
- `yarn pack` - generates package files, but doesn't bundle them. Useful for testing.
- `yarn dist` - builds full package bundles

You will need a MacOS signing certificate.

To generate the icons:

- `iconutil -c icon.icns icons`

To convert to Windows .ico use https://convertico.com/

# Publishing

Create a draft release on Github and set the tag to `vX.X.X` (with the version filled in from `package.json`).

`yarn pub`

Your Github token will need to exist in the `GH_TOKEN` environment variable. Create it from https://github.com/settings/tokens as a personal access token with scope `repo`

The release will then be uploaded to the draft and can be published when ready.
