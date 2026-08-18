import "css/prism.css";
import "katex/dist/katex.min.css";

import type { Authors, Writeups } from "contentlayer/generated";
import { allAuthors, allWriteups } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXLayoutRenderer } from "pliny/mdx-components.js";
import {
	allCoreContent,
	coreContent,
	sortPosts,
} from "pliny/utils/contentlayer.js";
import { components } from "@/components/content/MDXComponents";
import LazyMotionProvider from "@/components/core/LazyMotionProvider";
import siteMetadata from "@/data/siteMetadata.mjs";
import PostBanner from "@/layouts/PostBanner";
import PostLayout from "@/layouts/PostLayout";
import PostSimple from "@/layouts/PostSimple";

const defaultLayout = "PostLayout";
const layouts = {
	PostSimple,
	PostLayout,
	PostBanner,
};

export async function generateMetadata({
	params,
}): Promise<Metadata | undefined> {
	const { slug } = await params;
	const newslug = decodeURI(slug?.join("/"));
	const post = allWriteups.find((p) => p.slug === newslug);
	const authorList = post?.authors || ["default"];
	const authorDetails = authorList.map((author) => {
		const authorResults = allAuthors.find((p) => p.slug === author);
		return coreContent(authorResults as Authors);
	});
	if (!post) {
		return undefined;
	}

	const publishedAt = new Date(post.date).toISOString();
	const modifiedAt = new Date(post.lastmod ?? post.date).toISOString();
	const authors = authorDetails.map((author) => author.name);

	// Generate dynamic ogImage and imageList
	const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}`;
	const ogImage = {
		url: ogImageUrl,
		width: 1200,
		height: 630,
		alt: post.title,
	};
	const canonical = post.canonicalUrl || `${siteMetadata.siteUrl}/${post.path}`;

	return {
		title: post.title,
		description: post.summary,
		keywords: post.tags,
		alternates: {
			canonical,
		},
		robots: post.draft
			? { index: false, follow: false }
			: { index: true, follow: true },
		openGraph: {
			title: post.title,
			description: post.summary,
			siteName: siteMetadata.title,
			locale: "en_US",
			type: "article",
			publishedTime: publishedAt,
			modifiedTime: modifiedAt,
			tags: post.tags,
			url: canonical,
			images: [ogImage],
			authors: authors.length > 0 ? authors : [siteMetadata.author],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.summary,
			images: [ogImage.url],
		},
	};
}

export const generateStaticParams = async () => {
	const paths = allWriteups
		.filter((p) => !p.draft)
		.map((p) => ({ slug: p.slug.split("/") }));

	return paths;
};

export default async function Page({ params }) {
	const { slug } = await params;
	const newslug = decodeURI(slug?.join("/"));
	// Filter out drafts in production
	const sortedCoreContents = allCoreContent(
		sortPosts(allWriteups.filter((p) => !p.draft)),
	);
	const postIndex = sortedCoreContents.findIndex((p) => p.slug === newslug);
	if (postIndex === -1) {
		return notFound();
	}

	const prev = sortedCoreContents[postIndex + 1];
	const next = sortedCoreContents[postIndex - 1];
	const post = allWriteups.find((p) => p.slug === newslug) as Writeups;
	const authorList = post?.authors || ["default"];
	const authorDetails = authorList.map((author) => {
		const authorResults = allAuthors.find((p) => p.slug === author);
		return coreContent(authorResults as Authors);
	});
	const mainContent = coreContent(post);
	const jsonLd = post.structuredData;
	jsonLd.author = authorDetails.map((author) => {
		return {
			"@type": "Person",
			name: author.name,
		};
	});

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: siteMetadata.siteUrl,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Writeups",
				item: `${siteMetadata.siteUrl}/writeups`,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: post.title,
				item: `${siteMetadata.siteUrl}/${post.path}`,
			},
		],
	};

	const Layout = layouts[post.layout ?? defaultLayout];

	return (
		<div className="relative flex min-h-screen flex-col overflow-x-hidden">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<Layout
				content={mainContent}
				authorDetails={authorDetails}
				next={next}
				prev={prev}
			>
				<LazyMotionProvider>
					<MDXLayoutRenderer
						code={post.body.code}
						components={components}
						toc={post.toc}
					/>
				</LazyMotionProvider>
			</Layout>
		</div>
	);
}
