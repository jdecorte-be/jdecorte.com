import { allWriteups } from "contentlayer/generated";
import { Antonio } from "next/font/google";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
import type { ContributionDay } from "@/components/home/GithubContributions";
import Main from "./Main";

const antonio = Antonio({
	subsets: ["latin"],
});

// Fetched on the server (revalidated daily) so visitors don't pay for a
// third-party API round-trip + loading skeleton on the client.
async function getGithubContributions(
	username: string,
): Promise<ContributionDay[]> {
	try {
		const res = await fetch(
			`https://github-contributions-api.jogruber.de/v4/${username}?y=2025`,
			{ next: { revalidate: 86400 } },
		);
		if (!res.ok) return [];
		const result = await res.json();
		return (result.contributions ?? []).map(
			(c: { date: string; count: number; level: number }) => ({
				date: c.date,
				count: c.count,
				level: c.level as ContributionDay["level"],
			}),
		);
	} catch {
		return [];
	}
}

export default async function Page() {
	const sortedPosts = sortPosts(allWriteups.filter((post) => !post.draft));
	const posts = allCoreContent(sortedPosts);
	const contributions = await getGithubContributions("jdecorte-be");
	return (
		<Main
			posts={posts}
			heroFontStyles={antonio.className}
			contributions={contributions}
		/>
	);
}
