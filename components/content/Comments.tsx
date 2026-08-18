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
	"w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";

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
			className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${colorForName(name)}`}
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
					className="flex animate-pulse gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
				>
					<div className="h-9 w-9 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800" />
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
					className="rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:opacity-50"
				>
					{submitting ? "Posting…" : parentId ? "Post reply" : "Post comment"}
				</button>
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
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
			<div className="flex gap-3 rounded-lg border border-gray-200 bg-white/50 p-4 transition-colors hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/40 dark:hover:border-gray-700">
				<Avatar name={node.author} />
				<div className="min-w-0 flex-1">
					<div className="flex flex-wrap items-baseline gap-x-2">
						<span className="font-medium text-gray-900 dark:text-gray-100">
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
						className="prose prose-sm mt-1 max-w-none break-words text-gray-700 dark:prose-invert dark:text-gray-300 [&_a]:text-primary-500 [&_a]:underline [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.85em] [&_p]:my-1 dark:[&_code]:bg-gray-800"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: renderCommentMarkdown HTML-escapes input before introducing any markup
						dangerouslySetInnerHTML={{
							__html: renderCommentMarkdown(node.body),
						}}
					/>
					{depth < MAX_REPLY_DEPTH && (
						<button
							type="button"
							onClick={() => setReplying((v) => !v)}
							className="mt-1 text-xs font-medium text-gray-500 transition-colors hover:text-primary-500 dark:text-gray-400"
						>
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
				<ul className="mt-3 space-y-3 border-l border-gray-200 pl-4 dark:border-gray-800">
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
			<h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
				Comments{!loading && ` (${comments.length})`}
			</h2>

			{loading ? (
				<CommentsSkeleton />
			) : tree.length === 0 ? (
				<p className="text-sm text-gray-500 dark:text-gray-400">
					No comments yet. Be the first to write one.
				</p>
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

			<div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-800">
				<h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
					Leave a comment
				</h3>
				<CommentForm slug={slug} onPosted={handlePosted} />
			</div>
		</div>
	);
}
