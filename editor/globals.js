/**
 * Internal dependencies
 */

import apiFetch from './api';

// Patch apiFetch
window.wp = {
	apiFetch,
};
