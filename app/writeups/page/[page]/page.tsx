import { allWriteups } from "contentlayer/generated";
import type { Metadata } from "next";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
import siteMetadata from "@/data/siteMetadata.mjs";
import ListLayout from "@/layouts/ListLayoutWithTags";

const POSTS_PER_PAGE = 10;

export const generateStaticParams = async () => {
	const publishedPosts = allWriteups.filter((post) => !post.draft);
	const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);
	const paths = Array.from({ length: totalPages }, (_, i) => ({
		page: (i + 1).toString(),
	}));

	return paths;
};

export async function generateMetadata(props: {
	params: Promise<{ page: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	// Page 1 duplicates /writeups, so canonicalize it there instead of indexing both.
	const canonical =
		params.page === "1" ? `${siteMetadata.siteUrl}/writeups` : "./";
	return {
		title: `Writeups — Page ${params.page}`,
		description: siteMetadata.description,
		alternates: { canonical },
		// Listing/pagination page — keep out of the index, prioritize articles.
		robots: { index: false, follow: true },
	};
}

export default async function Page(
	props: Readonly<{ params: Promise<{ page: string }> }>,
) {
	const params = await props.params;
	const posts = allCoreContent(
		sortPosts(allWriteups.filter((post) => !post.draft)),
	);
	const pageNumber = Number.parseInt(params.page);
	const initialDisplayPosts = posts.slice(
		POSTS_PER_PAGE * (pageNumber - 1),
		POSTS_PER_PAGE * pageNumber,
	);
	const pagination = {
		currentPage: pageNumber,
		totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
	};

	return (
		<ListLayout
			posts={posts}
			initialDisplayPosts={initialDisplayPosts}
			pagination={pagination}
			title="Writeups"
		/>
	);
}
