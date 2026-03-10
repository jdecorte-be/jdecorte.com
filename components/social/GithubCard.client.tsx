"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import Link from "@/components/core/Link";

interface Language {
	name: string;
	percentage: number;
	color: string;
}

interface GithubCardClientProps {
	repo: string;
	description?: string;
	repoDescription?: string | null;
	languages?: Language[];
}

const cardMotion = {
	rest: {
		opacity: 1,
		y: 0,
		scale: 1,
		boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
		transition: { duration: 0.2, ease: "easeOut" },
	},
	hover: {
		y: -6,
		boxShadow: "0 20px 50px -30px rgba(15, 23, 42, 0.6)",
		transition: { duration: 0.2, ease: "easeOut", staggerChildren: 0.06 },
	},
};

const itemMotion = {
	rest: { opacity: 1, y: 0 },
	hover: {
		opacity: 1,
		y: -2,
		transition: { duration: 0.2, ease: "easeOut" },
	},
};

const barMotion = {
	rest: { opacity: 0.95, scaleX: 0.985 },
	hover: {
		opacity: 1,
		scaleX: 1,
		transition: { duration: 0.25, ease: "easeOut" },
	},
};

const GithubCardClient = ({
	repo,
	description,
	repoDescription,
	languages = [],
}: GithubCardClientProps) => {
	const [owner, repoName] = repo.split("/");
	const href = `https://github.com/${repo}`;
	const displayDescription = description ?? repoDescription;

	return (
		<LazyMotion features={domAnimation}>
			<Link
				href={href}
				className="group my-4 block no-underline"
				data-umami-event={`GitHub Card: ${repo}`}
			>
				<m.div
					className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 transition-colors duration-200 hover:border-primary-500 dark:border-white/[0.1] dark:bg-white/[0.03] dark:hover:border-primary-500/60"
					initial="rest"
					animate="rest"
					whileHover="hover"
					whileFocus="hover"
					variants={cardMotion}
				>
					{/* Repo name row */}
					<m.div className="flex items-center gap-2" variants={itemMotion}>
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
					</m.div>

					{/* Description */}
					{displayDescription && (
						<m.p
							className="text-sm text-gray-600 dark:text-gray-400"
							variants={itemMotion}
						>
							{displayDescription}
						</m.p>
					)}

					{/* Languages */}
					{languages.length > 0 && (
						<m.div className="flex flex-col gap-2" variants={itemMotion}>
							<p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
								Languages
							</p>
							{/* Bar */}
							<m.div
								className="flex h-2 w-full overflow-hidden rounded-full"
								style={{ transformOrigin: "left" }}
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
						</m.div>
					)}
				</m.div>
			</Link>
		</LazyMotion>
	);
};

export default GithubCardClient;
