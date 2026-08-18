import { genPageMetadata } from "app/seo";
import { allWriteups } from "contentlayer/generated";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
import Latest from "./Latest";

export const metadata = genPageMetadata({
	title: "Latest Writeups",
	description:
		"The most recent security research, CTF writeups, and systems programming deep dives from John Decorte.",
	// Listing page duplicating article summaries — keep out of the index,
	// prioritize the articles themselves.
	robots: { index: false, follow: true },
});

export default async function Page() {
	const sortedPosts = sortPosts(allWriteups.filter((post) => !post.draft));
	const posts = allCoreContent(sortedPosts);
	return <Latest posts={posts} />;
}
