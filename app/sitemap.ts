import { allWriteups } from "contentlayer/generated";
import type { MetadataRoute } from "next";
import siteMetadata from "@/data/siteMetadata.mjs";

export default function sitemap(): MetadataRoute.Sitemap {
	const siteUrl = siteMetadata.siteUrl;

	const writeupsRoutes = allWriteups
		.filter((post) => !post.draft)
		.map((post) => ({
			url: `${siteUrl}/${post.path}`,
			lastModified: post.lastmod ?? post.date,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		}));

	// "writeups", "writeups/tags", and paginated/tag listing pages are noindex
	// (see their route metadata) so they're intentionally left out here —
	// only indexable pages belong in the sitemap.
	const routes = ["", "writeups/latest", "legal"].map((route) => ({
		url: `${siteUrl}/${route}`,
		lastModified: new Date().toISOString().split("T")[0],
		changeFrequency: "weekly" as const,
		priority: route === "" ? 1.0 : 0.5,
	}));

	return [...routes, ...writeupsRoutes];
}
