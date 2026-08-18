/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
	title: "John Decorte — Full Stack Engineer",
	author: "John Decorte",
	headerTitle: "John Decorte — Full Stack Engineer",
	description: "John Decorte | Full-Stack Developer & Cybersecurity Engineer in Montreal. Explore my projects, skills, and experience.",
	language: "en",
	theme: "dark", // system, dark or light
	siteUrl: "https://jdecorte.com",
	siteRepo: "https://github.com/jdecorte-be/jdecorte.com",
	siteLogo: "/static/images/jd-white.avif",
	socialBanner: "/static/images/jdecorte-social.png",
	email: "jdecorte@proton.me",
	github: "https://github.com/jdecorte-be",
	// bluesky: "https://bsky.app/profile/jdecorte.com",
	linkedin: "https://www.linkedin.com/in/johndecorte/",
	locale: "en-CA",
	analytics: {
		// If you want to use an analytics provider you have to add it to the
		// content security policy in the `next.config.js` file.
		// supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
		umamiAnalytics: {
			// We use an env variable for this site to avoid other users cloning our analytics ID
			umamiWebsiteId: process.env.UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
			// Same-origin proxy (see rewrites in next.config.mjs) so ad blockers
			// don't filter the tracker; beacons go to /stats/api/send.
			src: "/stats/script.js",
			umamiHostUrl: "/stats",
			// Don't record query strings, and only track the production domain
			// (keeps localhost and preview deploys out of the stats).
			umamiExcludeSearch: true,
			umamiDomains: "jdecorte.com",
		},
		// plausibleAnalytics: {
		//   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
		// },
		// simpleAnalytics: {},
		// posthogAnalytics: {
		//   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
		// },
		// googleAnalytics: {
		//   googleAnalyticsId: '', // e.g. G-XXXXXXX
		// },
	},
	// newsletter: {
	//   // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
	//   // Please add your .env file and modify it according to your selection
	//   provider: 'buttondown',
	// },
	comments: {
	  // Self-hosted comments stored in MongoDB (see app/api/comments/route.ts).
	  // Requires MONGODB_URI in the environment.
	  provider: 'mongodb',
	},
	search: {
		provider: "kbar", // kbar or algolia
		kbarConfig: {
			searchDocumentsPath: "search.json", // path to load documents to search
		},
		// provider: 'algolia',
		// algoliaConfig: {
		//   // The application ID provided by Algolia
		//   appId: 'R2IYF7ETH7',
		//   // Public API key: it is safe to commit it
		//   apiKey: '599cec31baffa4868cae4e79f180729b',
		//   indexName: 'docsearch',
		// },
	},
};

export default siteMetadata;
