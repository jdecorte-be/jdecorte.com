"use client";

import { useEffect, useState } from "react";
import Link from "./Link";

// GitHub linguist colors for common languages
const LANG_COLORS: Record<string, string> = {
	C: "#555555",
	"C++": "#f34b7d",
	"C#": "#178600",
	Assembly: "#6E4C13",
	Makefile: "#427819",
	Python: "#3572A5",
	JavaScript: "#f1e05a",
	TypeScript: "#3178c6",
	Rust: "#dea584",
	Go: "#00ADD8",
	Java: "#b07219",
	Swift: "#F05138",
	"Objective-C": "#438eff",
	Shell: "#89e051",
	Ruby: "#701516",
	Lua: "#000080",
	Zig: "#ec915c",
	Haskell: "#5e5086",
	Nix: "#7e7eff",
	HTML: "#e34c26",
	CSS: "#563d7c",
	SCSS: "#c6538c",
	Dockerfile: "#384d54",
	CMake: "#DA3434",
};

interface Language {
	name: string;
	percentage: number;
	color: string;
}

interface GithubCardProps {
	repo: string;
	description?: string;
}

const GithubCard = ({ repo, description }: GithubCardProps) => {
	const [owner, repoName] = repo.split("/");
	const href = `https://github.com/${repo}`;

	const [repoDescription, setRepoDescription] = useState<string | null>(null);
	const [languages, setLanguages] = useState<Language[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [repoRes, langRes] = await Promise.all([
					fetch(`https://api.github.com/repos/${repo}`),
					fetch(`https://api.github.com/repos/${repo}/languages`),
				]);

				if (repoRes.ok) {
					const repoJson = await repoRes.json();
					setRepoDescription(repoJson.description ?? null);
				}

				if (langRes.ok) {
					const langJson: Record<string, number> = await langRes.json();
					const total = Object.values(langJson).reduce((a, b) => a + b, 0);
					setLanguages(
						Object.entries(langJson).map(([name, bytes]) => ({
							name,
							percentage: Math.round((bytes / total) * 1000) / 10,
							color: LANG_COLORS[name] || "#8b8b8b",
						})),
					);
				}
			} catch {
				// Silently fail — card still renders without fetched data
			}
		};

		fetchData();
	}, [repo]);

	const displayDescription = description ?? repoDescription;

	return (
		<Link
			href={href}
			className="group my-4 block no-underline"
			data-umami-event={`GitHub Card: ${repo}`}
		>
			<div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 transition-colors duration-200 hover:border-primary-500 dark:border-white/[0.1] dark:bg-white/[0.03] dark:hover:border-primary-500/60">
				{/* Repo name row */}
				<div className="flex items-center gap-2">
					<svg
						className="h-4 w-4 shrink-0 fill-gray-500 dark:fill-gray-400"
						viewBox="0 0 16 16"
						aria-hidden="true"
					>
						<path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
					</svg>
					<span className="font-semibold text-primary-500 group-hover:underline">
						<span className="text-gray-500 dark:text-gray-400">{owner}/</span>
						{repoName}
					</span>
				</div>

				{/* Description */}
				{displayDescription && (
					<p className="text-sm text-gray-600 dark:text-gray-400">
						{displayDescription}
					</p>
				)}

				{/* Languages */}
				{languages.length > 0 && (
					<div className="flex flex-col gap-2">
						<p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
							Languages
						</p>
						{/* Bar */}
						<div className="flex h-2 w-full overflow-hidden rounded-full">
							{languages.map((lang) => (
								<span
									key={lang.name}
									className="h-full"
									style={{
										width: `${lang.percentage}%`,
										backgroundColor: lang.color,
									}}
								/>
							))}
						</div>
						{/* Labels */}
						<div className="flex flex-wrap gap-x-4 gap-y-1">
							{languages.map((lang) => (
								<div
									key={lang.name}
									className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400"
								>
									<span
										className="inline-block h-2.5 w-2.5 rounded-full"
										style={{ backgroundColor: lang.color }}
									/>
									<span className="font-medium">{lang.name}</span>
									<span className="text-gray-400 dark:text-gray-500">
										{lang.percentage}%
									</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</Link>
	);
};

export default GithubCard;
