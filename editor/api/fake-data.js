const date = ( new Date() ).toISOString();

export const types = {
	post: {
		id: 1,
		name: 'Posts',
		rest_base: 'posts',
		slug: 'post',
		supports: {
			author: false,
			comments: false,
			'custom-fields': false,
			editor: true,
			excerpt: false,
			'page-attributes': false,
			revisions: false,
			thumbnail: false,
			title: true,
		},
		taxonomies: [ 'post_tag' ],
		viewable: true,
	},
};

export const post = {
	id: 1,
	content: {
		raw: '',
		rendered: '',
	},
	date,
	date_gmt: date,
	title: {
		raw: '',
		rendered: '',
	},
	excerpt: {
		raw: '',
		rendered: '',
	},
	status: 'draft',
	revisions: { count: 0, last_id: 0 },
	parent: 0,
	theme_style: true,
	type: 'post',
	link: '/preview',
	categories: [ ],
	featured_media: 0,
	permalink_template: '/preview',
	preview_link: '/preview',
	_links: {
		'wp:action-assign-categories': [],
		'wp:action-create-categories': [],
	},
};

export const users = [ {
	id: 1,
	name: 'Wordberg',
	url: '',
	description: '',
	link: 'https://automattic.com',
	slug: 'wordberg',
	avatar_urls: {
		24: 'http://2.gravatar.com/avatar/83888eb8aea456e4322577f96b4dbaab?s=24&d=mm&r=g',
		48: 'http://2.gravatar.com/avatar/83888eb8aea456e4322577f96b4dbaab?s=48&d=mm&r=g',
		96: 'http://2.gravatar.com/avatar/83888eb8aea456e4322577f96b4dbaab?s=96&d=mm&r=g',
	},
	meta: [],
	_links: {
		self: [], collection: [],
	},
} ];

export const taxonomies = {
};

export const themes = [ {
	theme_supports: {
		formats: [ 'standard', 'aside', 'image', 'video', 'quote', 'link', 'gallery', 'audio' ],
		'post-thumbnails': true,
		'responsive-embeds': false,
	},
} ];
