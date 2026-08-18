import { allWriteups } from "contentlayer/generated";
import { Antonio } from "next/font/google";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js";
import type { ContributionDay } from "@/components/home/GithubContributions";
import siteMetadata from "@/data/siteMetadata.mjs";
import Main from "./Main";

const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": `${siteMetadata.siteUrl}/#person`,
			name: siteMetadata.author,
			url: siteMetadata.siteUrl,
			jobTitle: "Full Stack & Security Engineer",
			email: siteMetadata.email,
			sameAs: [
				siteMetadata.github,
				siteMetadata.linkedin,
				siteMetadata.hackthebox,
			].filter(Boolean),
		},
		{
			"@type": "WebSite",
			"@id": `${siteMetadata.siteUrl}/#website`,
			url: siteMetadata.siteUrl,
			name: siteMetadata.title,
			description: siteMetadata.description,
			inLanguage: siteMetadata.language,
			author: { "@id": `${siteMetadata.siteUrl}/#person` },
		},
	],
};

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
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD, no user input
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Main
				posts={posts}
				heroFontStyles={antonio.className}
				contributions={contributions}
			/>
		</>
	);
}
