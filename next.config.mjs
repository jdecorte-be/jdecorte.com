import { createRequire } from "node:module";
import { withContentlayer } from "next-contentlayer2";

const require = createRequire(import.meta.url);

// Initialize bundle analyzer after import
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

// Check if maintenance mode is enabled
const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'self' *.s3.amazonaws.com;
  connect-src *;
  font-src 'self' fonts.gstatic.com;
  frame-src itch.io;
`;

const securityHeaders = [
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
	{
		key: "Content-Security-Policy",
		value: ContentSecurityPolicy.replace(/\n/g, ""),
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
	{
		key: "Strict-Transport-Security",
		value: "max-age=31536000; includeSubDomains",
	},
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=()",
	},
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	// Handle maintenance mode
	async redirects() {
		if (isMaintenanceMode) {
			return [
				{
					source: "/((?!maintenance|_next/static|_next/image|favicon.ico).*)",
					destination: "/maintenance",
					permanent: false,
				},
			];
		}
		return [];
	},
	// Serve the Umami tracker from our own origin so ad blockers that
	// filter umami.jdecorte.com don't drop pageviews.
	async rewrites() {
		return [
			{
				source: "/stats/script.js",
				destination: "https://umami.jdecorte.com/script.js",
			},
			{
				source: "/stats/api/send",
				destination: "https://umami.jdecorte.com/api/send",
			},
		];
	},
	reactStrictMode: true,
	// Enable gzip/brotli compression for responses served by Next.js
	compress: true,
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
	turbopack: {},
	// allow fetches for assets from this origin during development
	allowedDevOrigins: ["https://jdecorte.com"],
	images: {
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60 * 60 * 24 * 30,
	},
	async headers() {
		return [
			// NOTE: /_next/static is served immutable by Next itself, and /_next/image
			// URLs are not content-hashed (cache lifetime comes from images.minimumCacheTTL),
			// so neither route gets a manual Cache-Control override here.
			// Static files and common asset extensions
			{
				source:
					"/:path*\\.(js|css|svg|jpg|jpeg|png|webp|avif|gif|ico|ttf|woff|woff2|eot)$",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			// The proxied Umami tracker is not content-hashed; later rules win,
			// so this overrides the immutable *.js rule above.
			{
				source: "/stats/script.js",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=3600, must-revalidate",
					},
				],
			},
			// Fallback: security headers for all routes
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		];
	},
};

// Export the config with plugins
const config = withContentlayer(nextConfig);
export default withBundleAnalyzer(config);
