/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import tagData from "app/tag-data.json" with { type: "json" };
import type { Writeups } from "contentlayer/generated";
import { slug } from "github-slugger";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata.mjs";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
}
interface ListLayoutProps {
	posts: CoreContent<Writeups>[];
	title: string;
	initialDisplayPosts?: CoreContent<Writeups>[];
	pagination?: PaginationProps;
}

function Pagination({ totalPages, currentPage }: Readonly<PaginationProps>) {
	const pathname = usePathname();
	const basePath = pathname.split("/")[1];
	const prevPage = currentPage - 1 > 0;
	const nextPage = currentPage + 1 <= totalPages;

	return (
		<div className="space-y-2 pb-8 pt-6 md:space-y-5">
			<nav className="flex justify-between">
				{!prevPage && (
					<button
						type="button"
						className="cursor-auto disabled:opacity-50"
						disabled={!prevPage}
					>
						Previous
					</button>
				)}
				{prevPage && (
					<Link
						href={
							currentPage - 1 === 1
								? `/${basePath}/`
								: `/${basePath}/page/${currentPage - 1}`
						}
						rel="prev"
					>
						Previous
					</Link>
				)}
				<span>
					{currentPage} of {totalPages}
				</span>
				{!nextPage && (
					<button
						type="button"
						className="cursor-auto disabled:opacity-50"
						disabled={!nextPage}
					>
						Next
					</button>
				)}
				{nextPage && (
					<Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
						Next
					</Link>
				)}
			</nav>
		</div>
	);
}

export default function ListLayoutWithTags({
	posts,
	title,
	initialDisplayPosts = [],
	pagination,
}: Readonly<ListLayoutProps>) {
	const pathname = usePathname();
	const tagCounts = tagData as Record<string, number>;
	const tagKeys = Object.keys(tagCounts);
	const sortedTags = tagKeys.toSorted((a, b) => tagCounts[b] - tagCounts[a]);

	const displayPosts =
		initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

	const [mobileTagsOpen, setMobileTagsOpen] = useState(false);

	return (
		<div className="chronicle">
			{/* Mobile Header + Tag Toggle */}
			<div className="pb-4 pt-6 sm:hidden">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
						{title}
					</h1>
					<button
						type="button"
						onClick={() => setMobileTagsOpen((v) => !v)}
						className="inline-flex items-center gap-1.5 rounded-md border border-gray-700 bg-[hsl(230_15%_12%)] px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-gray-300 transition-colors hover:border-primary-500 hover:text-primary-400"
						aria-expanded={mobileTagsOpen}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="h-3.5 w-3.5"
						>
							<path
								fillRule="evenodd"
								d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
								clipRule="evenodd"
							/>
						</svg>
						Tags
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className={`h-3.5 w-3.5 transition-transform ${mobileTagsOpen ? "rotate-180" : ""}`}
						>
							<path
								fillRule="evenodd"
								d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>

				{/* Mobile tags panel */}
				<AnimatePresence>
					{mobileTagsOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.25, ease: "easeInOut" }}
							className="overflow-hidden"
						>
							<div className="mt-3 flex flex-wrap gap-2 rounded-md border border-gray-800 bg-[hsl(230_15%_10%)] p-3">
								{pathname.startsWith("/writeups") && !pathname.includes("/tags/") ? (
									<span className="rounded-full border border-primary-500/40 bg-primary-500/10 px-3 py-1 text-xs font-bold uppercase text-primary-400">
										All Posts
									</span>
								) : (
									<Link
										href="/writeups"
										className="rounded-full border border-gray-700 px-3 py-1 text-xs font-medium uppercase text-gray-400 transition-colors hover:border-primary-500 hover:text-primary-400"
									>
										All Posts
									</Link>
								)}
								{sortedTags.map((t) => {
									const isActive = pathname.split("/tags/")[1] === slug(t);
									return isActive ? (
										<span
											key={t}
											className="rounded-full border border-primary-500/40 bg-primary-500/10 px-3 py-1 text-xs font-bold uppercase text-primary-400"
										>
											{t} ({tagCounts[t]})
										</span>
									) : (
										<Link
											key={t}
											href={`/writeups/tags/${slug(t)}`}
											className="rounded-full border border-gray-700 px-3 py-1 text-xs font-medium uppercase text-gray-400 transition-colors hover:border-primary-500 hover:text-primary-400"
										>
											{t} ({tagCounts[t]})
										</Link>
									);
								})}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<div className="mt-10 flex items-start sm:space-x-10">
				{/* Sidebar tags — desktop only */}
				<div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-[hsl(230_15%_10%)] pt-5 shadow-md dark:bg-[hsl(230_15%_10%)] dark:shadow-gray-800/40 sm:flex">
					<div className="px-6 py-4">
						{pathname.startsWith("/writeups") ? (
							<span className="font-bold uppercase text-primary-500">
								All Posts
							</span>
						) : (
							<Link
								href="/writeups"
								className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
							>
								All Posts
							</Link>
						)}
						<ul>
							{sortedTags.map((t) => {
								return (
									<li key={t} className="my-3">
										{pathname.split("/tags/")[1] === slug(t) ? (
										<span className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
											{`${t} (${tagCounts[t]})`}
										</span>
										) : (
											<Link
												href={`/writeups/tags/${slug(t)}`}
												className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
												aria-label={`View posts tagged ${t}`}
											>
												{`${t} (${tagCounts[t]})`}
											</Link>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				</div>

				{/* Timeline */}
				<div className="chronicle-timeline relative w-full flex-1 max-w-none">
					{displayPosts.map((post, idx) => {
						const { path, date, title, summary, tags } = post;
						return (
							<motion.article
								key={path}
								className="timeline-entry group relative grid grid-cols-[1fr_56px] gap-x-2 gap-y-0 pb-3 sm:grid-cols-[1fr_80px] sm:gap-x-4 md:gap-x-6"
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.4,
									ease: "easeOut",
									delay: idx * 0.06,
								}}
							>
								{/* Card */}
								<div className="timeline-content min-w-0">
									<Link href={`/${path}`} className="block">
										<div className="rounded-l-lg border-r-2 border-primary-500/50 bg-[hsl(230_15%_10%)] px-3 py-4 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-accent-400 group-hover:bg-[hsl(230_15%_16%)] group-hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] sm:px-5 sm:py-5 md:px-7 md:py-6">
											{/* Title */}
											<h2 className="text-base font-bold leading-tight tracking-tight text-gray-100 transition-colors group-hover:text-primary-400 sm:text-xl md:text-2xl">
												{title}
											</h2>

											{/* Badges */}
											<div className="mt-2 flex flex-wrap gap-1.5">
												{tags?.map((tag, i) => (
													<Tag key={tag} text={tag} index={i} asSpan />
												))}
											</div>

											{/* Draft badge */}
											{post.draft && (
												<span className="ml-2 inline-block rounded bg-red-500/20 px-2 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-red-400">
													Draft
												</span>
											)}

											{/* Summary */}
											{summary && (
												<p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-400">
													{summary}
												</p>
											)}
										</div>
									</Link>
								</div>

								{/* Date column */}
								<div className="relative flex items-start gap-3 pt-2">
									{/* Vertical line segment (anchored to dot center) */}
									<div
										className="absolute left-[4.5px] top-0 w-px bg-gray-800"
										style={{ bottom: idx < displayPosts.length - 1 ? '-0.75rem' : '0' }}
									/>
									{/* Timeline dot */}
									<div className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-primary-500 bg-gray-950 transition-colors group-hover:border-accent-400 group-hover:bg-accent-400" />
									<time
										dateTime={date}
										className="flex flex-col items-start font-mono text-xs leading-tight tracking-wider text-gray-500 dark:text-gray-400"
									>
										<span className="text-[0.65rem] uppercase text-gray-500">
											{new Date(date).toLocaleString(siteMetadata.locale, { month: "short" })}
										</span>
										<span className="text-lg font-bold text-gray-300">
											{new Date(date).getDate().toString().padStart(2, "0")}
										</span>
										<span className="text-[0.6rem] text-gray-600">
											{new Date(date).getFullYear()}
										</span>
									</time>
								</div>
							</motion.article>
						);
					})}

					{pagination && pagination.totalPages > 1 && (
						<Pagination
							currentPage={pagination.currentPage}
							totalPages={pagination.totalPages}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
