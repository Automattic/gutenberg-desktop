import apiFetch from '@wordpress/api-fetch';

if (window.wp.apiFetch) {
	const props = Object.keys(apiFetch);

	props.forEach(prop => {
		window.wp.apiFetch[prop] = window.wp.apiFetch[prop] || apiFetch[prop];
	});
}
else {
	window.wp.apiFetch = apiFetch;
}
