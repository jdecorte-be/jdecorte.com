"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import siteMetadata from "@/data/siteMetadata.mjs";
import { MAX_AUTHOR_LENGTH, MAX_BODY_LENGTH } from "@/lib/commentLimits";
import { renderCommentMarkdown } from "@/lib/commentMarkdown";

type Comment = {
	id: string;
	author: string;
	body: string;
	createdAt: string;
	parentId: string | null;
};

type CommentNode = Comment & { replies: CommentNode[] };

const MAX_REPLY_DEPTH = 4;
const AUTHOR_STORAGE_KEY = "comment-author";

const AVATAR_COLORS = [
	"bg-rose-500",
	"bg-orange-500",
	"bg-amber-500",
	"bg-lime-600",
	"bg-emerald-500",
	"bg-teal-500",
	"bg-cyan-500",
	"bg-blue-500",
	"bg-indigo-500",
	"bg-violet-500",
	"bg-fuchsia-500",
	"bg-pink-500",
];

const inputClasses =
	"w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";

function formatDate(date: string) {
	return new Date(date).toLocaleDateString(siteMetadata.locale, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

function timeAgo(date: string) {
	const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
	if (seconds < 60) return "just now";
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m ago`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	if (days < 7) return `${days}d ago`;
	return formatDate(date);
}

function colorForName(name: string) {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = (hash * 31 + name.charCodeAt(i)) | 0;
	}
	return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function initialsForName(name: string) {
	const initials = name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");
	return initials || "?";
}

function buildTree(comments: Comment[]): CommentNode[] {
	const nodes = new Map<string, CommentNode>();
	for (const comment of comments) {
		nodes.set(comment.id, { ...comment, replies: [] });
	}
	const roots: CommentNode[] = [];
	for (const comment of comments) {
		const node = nodes.get(comment.id);
		if (!node) continue;
		const parent = comment.parentId ? nodes.get(comment.parentId) : undefined;
		if (parent) {
			parent.replies.push(node);
		} else {
			roots.push(node);
		}
	}
	return roots;
}

function Avatar({ name }: { name: string }) {
	return (
		<span
			aria-hidden="true"
			className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white shadow-sm ring-2 ring-white dark:ring-gray-950 ${colorForName(name)}`}
		>
			{initialsForName(name)}
		</span>
	);
}

function CommentsSkeleton() {
	return (
		<ul className="space-y-4" aria-hidden="true">
			{[0, 1, 2].map((i) => (
				<li
					key={i}
					className="flex animate-pulse gap-3 rounded-xl border border-gray-200 bg-white/50 p-4 dark:border-gray-800 dark:bg-gray-900/40"
				>
					<div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800" />
					<div className="flex-1 space-y-2 py-1">
						<div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />
						<div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
						<div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
					</div>
				</li>
			))}
		</ul>
	);
}

function CommentForm({
	slug,
	parentId = null,
	onPosted,
	onCancel,
	autoFocus,
}: {
	slug: string;
	parentId?: string | null;
	onPosted: (comment: Comment) => void;
	onCancel?: () => void;
	autoFocus?: boolean;
}) {
	const [author, setAuthor] = useState("");
	const [body, setBody] = useState("");
	const [website, setWebsite] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const saved = window.localStorage.getItem(AUTHOR_STORAGE_KEY);
		if (saved) setAuthor(saved);
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (submitting) return;
		setSubmitting(true);
		setError(null);
		try {
			const res = await fetch("/api/comments", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ slug, author, body, parentId, website }),
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data.error ?? "Failed to post comment.");
				return;
			}
			window.localStorage.setItem(AUTHOR_STORAGE_KEY, author);
			onPosted(data.comment);
			setBody("");
			window.umami?.track(parentId ? "Reply posted" : "Comment posted", {
				slug,
			});
			onCancel?.();
		} catch {
			setError("Failed to post comment.");
		} finally {
			setSubmitting(false);
		}
	};

	const remaining = MAX_BODY_LENGTH - body.length;

	return (
		<form onSubmit={handleSubmit} className="relative mt-3 space-y-3">
			<input
				type="text"
				value={author}
				onChange={(e) => setAuthor(e.target.value)}
				placeholder="Your name"
				maxLength={MAX_AUTHOR_LENGTH}
				required
				// biome-ignore lint/a11y/noAutofocus: only set when the user just clicked "Reply", an explicit action that warrants moving focus to the new form
				autoFocus={autoFocus}
				className={inputClasses}
			/>
			<div>
				<textarea
					value={body}
					onChange={(e) => setBody(e.target.value)}
					placeholder="Write a comment…"
					maxLength={MAX_BODY_LENGTH}
					required
					rows={parentId ? 3 : 4}
					className={inputClasses}
				/>
				<div className="mt-1 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
					<span>
						Supports <strong>**bold**</strong>, <em>*italic*</em>,{" "}
						<code>`code`</code>, and [links](https://…)
					</span>
					<span className={remaining < 100 ? "text-red-500" : undefined}>
						{remaining}
					</span>
				</div>
			</div>

			{/* Honeypot: hidden from real users, often filled in by bots. */}
			<input
				type="text"
				name="website"
				value={website}
				onChange={(e) => setWebsite(e.target.value)}
				tabIndex={-1}
				autoComplete="off"
				aria-hidden="true"
				className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden opacity-0"
			/>

			{error && (
				<p className="text-sm text-red-500" role="alert">
					{error}
				</p>
			)}
			<div className="flex items-center gap-3">
				<button
					type="submit"
					disabled={submitting}
					className="inline-flex items-center gap-1.5 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{submitting ? (
						"Posting…"
					) : (
						<>
							<svg
								aria-hidden="true"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-4 w-4"
							>
								<path d="M3.4 2.5a.75.75 0 0 1 .804-.06l14 7.25a.75.75 0 0 1 0 1.33l-14 7.25a.75.75 0 0 1-1.09-.79l1.51-6.06a.25.25 0 0 1 .19-.19l7.31-1.73a.1.1 0 0 0 0-.2L4.815 7.55a.25.25 0 0 1-.19-.19L3.114 1.3a.75.75 0 0 1 .286-.8z" />
							</svg>
							{parentId ? "Post reply" : "Post comment"}
						</>
					)}
				</button>
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
					>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
}

function CommentItem({
	node,
	slug,
	depth,
	onPosted,
}: {
	node: CommentNode;
	slug: string;
	depth: number;
	onPosted: (comment: Comment) => void;
}) {
	const [replying, setReplying] = useState(false);

	return (
		<li>
			<div className="group flex gap-3 rounded-xl border border-gray-200 bg-white/60 p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-gray-700">
				<Avatar name={node.author} />
				<div className="min-w-0 flex-1">
					<div className="flex flex-wrap items-baseline gap-x-2">
						<span className="font-semibold text-gray-900 dark:text-gray-100">
							{node.author}
						</span>
						<span
							className="text-xs text-gray-400 dark:text-gray-500"
							title={formatDate(node.createdAt)}
						>
							{timeAgo(node.createdAt)}
						</span>
					</div>
					<div
						className="prose prose-sm mt-1.5 max-w-none break-words text-gray-700 dark:prose-invert dark:text-gray-300 [&_a]:text-primary-500 [&_a]:underline [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em] [&_p]:my-1 dark:[&_code]:bg-gray-800"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: renderCommentMarkdown HTML-escapes input before introducing any markup
						dangerouslySetInnerHTML={{
							__html: renderCommentMarkdown(node.body),
						}}
					/>
					{depth < MAX_REPLY_DEPTH && (
						<button
							type="button"
							onClick={() => setReplying((v) => !v)}
							className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
						>
							<svg
								aria-hidden="true"
								viewBox="0 0 20 20"
								fill="none"
								stroke="currentColor"
								strokeWidth={1.75}
								className="h-3.5 w-3.5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 4 4 9l5 5M4 9h7a5 5 0 0 1 5 5v2"
								/>
							</svg>
							{replying ? "Cancel" : "Reply"}
						</button>
					)}
					{replying && (
						<CommentForm
							slug={slug}
							parentId={node.id}
							autoFocus
							onPosted={(comment) => {
								onPosted(comment);
								setReplying(false);
							}}
							onCancel={() => setReplying(false)}
						/>
					)}
				</div>
			</div>
			{node.replies.length > 0 && (
				<ul className="mt-3 space-y-3 border-l-2 border-gray-200 pl-4 dark:border-gray-800">
					{node.replies.map((reply) => (
						<CommentItem
							key={reply.id}
							node={reply}
							slug={slug}
							depth={depth + 1}
							onPosted={onPosted}
						/>
					))}
				</ul>
			)}
		</li>
	);
}

export default function Comments({ slug }: { slug: string }) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
			.then((res) => (res.ok ? res.json() : Promise.reject()))
			.then((data) => {
				if (!cancelled) setComments(data.comments);
			})
			.catch(() => {
				if (!cancelled) setError("Could not load comments.");
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});
		return () => {
			cancelled = true;
		};
	}, [slug]);

	const tree = useMemo(() => buildTree(comments), [comments]);

	const handlePosted = (comment: Comment) => {
		setComments((prev) => [...prev, comment]);
	};

	if (!siteMetadata.comments) return null;

	return (
		<div className="text-left" id="comments-container">
			<div className="mb-5 flex items-center gap-2">
				<svg
					aria-hidden="true"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="h-5 w-5 text-primary-500"
				>
					<path
						fillRule="evenodd"
						d="M2 4.75A2.75 2.75 0 0 1 4.75 2h10.5A2.75 2.75 0 0 1 18 4.75v7.5A2.75 2.75 0 0 1 15.25 15H9.06l-3.573 2.68A.75.75 0 0 1 4.28 17V15h-.03A2.75 2.75 0 0 1 1.5 12.25v-7.5Z"
						clipRule="evenodd"
					/>
				</svg>
				<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
					Comments
				</h2>
				{!loading && (
					<span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-xs font-semibold text-primary-500">
						{comments.length}
					</span>
				)}
			</div>

			{loading ? (
				<CommentsSkeleton />
			) : tree.length === 0 ? (
				<div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-gray-300 py-10 text-center dark:border-gray-700">
					<svg
						aria-hidden="true"
						viewBox="0 0 20 20"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						className="h-8 w-8 text-gray-400 dark:text-gray-600"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2 4.75A2.75 2.75 0 0 1 4.75 2h10.5A2.75 2.75 0 0 1 18 4.75v7.5A2.75 2.75 0 0 1 15.25 15H9.06l-3.573 2.68A.75.75 0 0 1 4.28 17V15h-.03A2.75 2.75 0 0 1 1.5 12.25v-7.5Z"
						/>
					</svg>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						No comments yet. Be the first to write one.
					</p>
				</div>
			) : (
				<ul className="space-y-4">
					{tree.map((node) => (
						<CommentItem
							key={node.id}
							node={node}
							slug={slug}
							depth={0}
							onPosted={handlePosted}
						/>
					))}
				</ul>
			)}

			{error && (
				<p className="mt-4 text-sm text-red-500" role="alert">
					{error}
				</p>
			)}

			<div className="mt-8 rounded-xl border border-gray-200 bg-gray-50/60 p-4 dark:border-gray-800 dark:bg-gray-900/30">
				<h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
					Leave a comment
				</h3>
				<CommentForm slug={slug} onPosted={handlePosted} />
			</div>
		</div>
	);
}
