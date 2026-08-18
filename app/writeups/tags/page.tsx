import { genPageMetadata } from "app/seo";
import tagData from "app/tag-data.json" with { type: "json" };
import { slug } from "github-slugger";
import { getTagColor } from "@/components/content/Tag";
import Link from "@/components/core/Link";

export const metadata = genPageMetadata({
	title: "Tags",
	description: "Things I write about",
	// Thin/duplicate index page — keep out of search results, prioritize articles.
	robots: { index: false, follow: true },
});

export default async function Page() {
	const tagCounts = tagData as Record<string, number>;
	const tagKeys = Object.keys(tagCounts);
	const sortedTags = tagKeys.toSorted((a, b) => tagCounts[b] - tagCounts[a]);

	return (
		<div className="pb-16 pt-6 md:pt-10">
			<div className="mb-10 border-b border-white/[0.08] pb-6">
				<span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
					/writeups
				</span>
				<h1 className="mt-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl md:text-5xl">
					Tags
				</h1>
				<p className="mt-3 text-sm text-gray-400">
					{tagKeys.length === 0
						? "No tags found."
						: `${tagKeys.length} topic${tagKeys.length === 1 ? "" : "s"} across every writeup — pick one to filter.`}
				</p>
			</div>

			{tagKeys.length > 0 && (
				<div className="flex flex-wrap gap-3">
					{sortedTags.map((t) => {
						const color = getTagColor(t);
						return (
							<Link
								key={t}
								href={`/writeups/tags/${slug(t)}`}
								aria-label={`View posts tagged ${t}`}
								className={`group flex items-center gap-2 rounded-md border bg-[hsl(230_15%_10%)] px-4 py-2.5 font-mono text-sm font-semibold tracking-wide transition-colors ${color.border} ${color.text} ${color.bg}`}
							>
								<span>{t.split(" ").join("-")}</span>
								<span className="rounded-sm bg-black/30 px-1.5 py-0.5 text-xs text-gray-400 transition-colors group-hover:text-gray-300">
									{tagCounts[t]}
								</span>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}
