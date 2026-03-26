import GithubCardClient from "./GithubCard.client";

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

interface GithubCardProps {
	repo: string;
	description?: string;
}
interface Language {
	name: string;
	percentage: number;
	color: string;
}
interface RepoStats {
	stars: number;
	forks: number;
	watchers: number;
	avatar: string;
}

const toPercentage = (bytes: number, total: number) =>
	Math.round((bytes / total) * 1000) / 10;

const fetchRepoData = async (repo: string) => {
	try {
		const response = await fetch(`https://api.github.com/repos/${repo}`, {
			next: { revalidate: 3600 },
		});

		if (!response.ok) return { description: null, stats: null };
		const repoJson = await response.json();
		return {
			description: repoJson.description ?? null,
			stats: {
				stars: repoJson.stargazers_count ?? 0,
				forks: repoJson.forks_count ?? 0,
				watchers: repoJson.subscribers_count ?? 0,
				avatar: repoJson.owner?.avatar_url ?? "",
			} as RepoStats,
		};
	} catch {
		return { description: null, stats: null };
	}
};

const fetchLanguages = async (repo: string) => {
	try {
		const response = await fetch(
			`https://api.github.com/repos/${repo}/languages`,
			{
				next: { revalidate: 3600 },
			},
		);

		if (!response.ok) return [] as Language[];
		const langJson: Record<string, number> = await response.json();
		const total = Object.values(langJson).reduce((a, b) => a + b, 0);
		if (!total) return [] as Language[];
		return Object.entries(langJson).map(([name, bytes]) => ({
			name,
			percentage: toPercentage(bytes, total),
			color: LANG_COLORS[name] || "#8b8b8b",
		}));
	} catch {
		return [] as Language[];
	}
};

const GithubCard = async ({ repo, description }: GithubCardProps) => {
	const [repoData, languages] = await Promise.all([
		fetchRepoData(repo),
		fetchLanguages(repo),
	]);

	return (
		<GithubCardClient
			repo={repo}
			description={description}
			repoDescription={repoData.description}
			languages={languages}
			stats={repoData.stats}
		/>
	);
};

export default GithubCard;
