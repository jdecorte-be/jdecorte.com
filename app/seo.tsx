import type { Metadata } from "next";
import siteMetadata from "@/data/siteMetadata.mjs";

interface PageSEOProps {
	title: string;
	description?: string;
	image?: string;
	[key: string]: unknown;
}

export function genPageMetadata({
	title,
	description,
	image,
	...rest
}: PageSEOProps): Metadata {
	const images = image
		? [image]
		: [{ url: siteMetadata.socialBanner, width: 1200, height: 675 }];
	return {
		title,
		description: description ?? siteMetadata.description,
		alternates: {
			canonical: "./",
		},
		openGraph: {
			title: `${title} | ${siteMetadata.title}`,
			description: description ?? siteMetadata.description,
			url: "./",
			siteName: siteMetadata.title,
			images,
			locale: siteMetadata.locale,
			type: "website",
		},
		twitter: {
			title: `${title} | ${siteMetadata.title}`,
			card: "summary_large_image",
			images: image ? [image] : [siteMetadata.socialBanner],
		},
		...rest,
	};
}
