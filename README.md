# Wordberg

What happens when Gutenberg and Electron are mashed together.

As with other Electron apps there are two basic components:
- The main app, running inside Electron. This provides the native side of things, and starts the web renderer
- The web renderer, where the web app runs.

Communication between the two parts is through the functions exposed in `preload.js`

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

- `yarn dev` - this will start webpack in development mode, and any changes will be auto-compiled
- `yarn startdev` - this starts Electron, and points it at the development webpack

Hot reloading is not enabled yet and you may need to reload pages.

Note that any changes to the main Electron code will require Electron to be restarted.

# Production

To get a production copy:

- `yarn build` - builds `app/editor.build.js`, which is bundled with the main Electron app
- `yarn start` - start Electron and points it at `app/editor.build.js`

# Packaging for distribution

- `yarn build` - make sure we have the latest code
- `yarn dist`

You will need a MacOS signing certificate.
