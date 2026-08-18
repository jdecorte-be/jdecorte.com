import { genPageMetadata } from "app/seo";
import { allWriteups } from "contentlayer/generated";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
import ListLayout from "@/layouts/ListLayoutWithTags";

const POSTS_PER_PAGE = 10;

export const metadata = genPageMetadata({
	title: "Writeups",
	description:
		"Security research, CTF writeups, and systems programming deep dives by John Decorte — from binary exploitation to network protocols.",
	// Listing page — keep it out of the index so search traffic lands on
	// individual articles instead; still follow links so they get crawled.
	robots: { index: false, follow: true },
});

export default function ThoughtPage() {
	const posts = allCoreContent(
		sortPosts(allWriteups.filter((post) => !post.draft)),
	);
	const pageNumber = 1;
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
