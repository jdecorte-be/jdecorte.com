"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import Link from "@/components/core/Link";

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

interface GithubCardClientProps {
	repo: string;
	description?: string;
	repoDescription?: string | null;
	languages?: Language[];
	stats?: RepoStats | null;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

const cardMotion = {
	rest: {
		opacity: 1,
		y: 0,
		scale: 1,
		boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
		transition: { duration: 0.2, ease: easeOut },
	},
	hover: {
		y: -6,
		boxShadow: "0 20px 50px -30px rgba(15, 23, 42, 0.6)",
		transition: { duration: 0.2, ease: easeOut, staggerChildren: 0.06 },
	},
};

const itemMotion = {
	rest: { opacity: 1, y: 0 },
	hover: {
		opacity: 1,
		y: -2,
		transition: { duration: 0.2, ease: easeOut },
	},
};

const barMotion = {
	rest: { opacity: 0.95, scaleX: 0.985 },
	hover: {
		opacity: 1,
		scaleX: 1,
		transition: { duration: 0.25, ease: easeOut },
	},
};

const GithubCardClient = ({
	repo,
	description,
	repoDescription,
	languages = [],
	stats,
}: GithubCardClientProps) => {
	const [owner, repoName] = repo.split("/");
	const href = `https://github.com/${repo}`;
	const displayDescription = description ?? repoDescription;

	const formatCount = (count: number) => {
		if (count >= 1000) {
			return `${(count / 1000).toFixed(1)}k`;
		}
		return count.toString();
	};

	return (
		<LazyMotion features={domAnimation}>
			<Link
				href={href}
				className="group my-3 block no-underline"
				data-umami-event={`GitHub Card: ${repo}`}
			>
				<m.div
					className="rounded-lg border-2 border-gray-200 bg-gray-50 px-4 pb-4 transition-colors duration-200 hover:border-primary-500 dark:border-white/[0.1] dark:bg-white/[0.03] dark:hover:border-primary-500/60"
					initial="rest"
					animate="rest"
					whileHover="hover"
					whileFocus="hover"
					variants={cardMotion}
				>
					{/* Header: Avatar + Name */}
					<m.div className="mb-2 flex items-start gap-3" variants={itemMotion}>
						{stats?.avatar && (
							<img
								src={stats.avatar}
								alt={`${owner} avatar`}
								className="h-12 w-12 rounded-full"
							/>
						)}
						<div className="min-w-0 flex-1">
							<h3 className="truncate text-base font-semibold text-primary-500 group-hover:underline">
								{owner}/{repoName}
							</h3>
							{displayDescription && (
								<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
									{displayDescription}
								</p>
							)}
						</div>
					</m.div>

					{/* Stats */}
					{stats && (
						<m.div
							className="mb-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
							variants={itemMotion}
						>
							<div className="flex items-center gap-1">
								<svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
									<path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
								</svg>
								<span>{formatCount(stats.stars)}</span>
							</div>
							<div className="flex items-center gap-1">
								<svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
									<path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
								</svg>
								<span>{formatCount(stats.forks)}</span>
							</div>
							<div className="flex items-center gap-1">
								<svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
									<path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z" />
								</svg>
								<span>{formatCount(stats.watchers)}</span>
							</div>
						</m.div>
					)}

					{/* Languages */}
					{languages.length > 0 && (
						<m.div variants={itemMotion}>
							<m.div
								className="mb-2 flex h-2 w-full overflow-hidden rounded-full"
								variants={barMotion}
							>
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
							</m.div>
							<div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
								{languages.map((lang) => (
									<div key={lang.name} className="flex items-center gap-1">
										<span
											className="inline-block h-2 w-2 rounded-full"
											style={{ backgroundColor: lang.color }}
										/>
										<span>{lang.name}</span>
										<span className="text-gray-400 dark:text-gray-500">
											{lang.percentage}%
										</span>
									</div>
								))}
							</div>
						</m.div>
					)}
				</m.div>
			</Link>
		</LazyMotion>
	);
};

export default GithubCardClient;
