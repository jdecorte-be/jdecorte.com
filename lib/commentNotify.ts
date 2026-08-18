import { allWriteups } from "contentlayer/generated";
import { Resend } from "resend";
import siteMetadata from "@/data/siteMetadata.mjs";
import { escapeHtml } from "@/lib/commentMarkdown";

/**
 * Best-effort email notification for a new comment/reply. Reuses the same
 * Resend setup as the weekly stats email; silently no-ops if unconfigured
 * and never throws, so a failed send can't take down comment submission.
 */
export async function notifyNewComment({
	slug,
	author,
	body,
	isReply,
}: {
	slug: string;
	author: string;
	body: string;
	isReply: boolean;
}): Promise<void> {
	const resendKey = process.env.RESEND_API_KEY;
	const from = process.env.STATS_EMAIL_FROM;
	const to = (process.env.COMMENT_EMAIL_TO ?? siteMetadata.email)
		.split(",")
		.map((address) => address.trim())
		.filter(Boolean);
	if (!resendKey || !from || to.length === 0) return;

	try {
		const post = allWriteups.find((p) => p.slug === slug);
		const title = post?.title ?? slug;
		const url = `${siteMetadata.siteUrl}/${post?.path ?? slug}#comments-container`;
		const verb = isReply ? "replied" : "commented";

		const resend = new Resend(resendKey);
		const { error } = await resend.emails.send({
			from,
			to,
			subject: `New ${isReply ? "reply" : "comment"} on "${title}"`,
			html: `
				<p><strong>${escapeHtml(author)}</strong> ${verb} on <a href="${url}">${escapeHtml(title)}</a>:</p>
				<blockquote style="margin:0;padding:0.5em 1em;border-left:3px solid #ccc;white-space:pre-wrap;">${escapeHtml(body)}</blockquote>
				<p><a href="${url}">View on the site</a></p>
			`,
			text: `${author} ${verb} on "${title}":\n\n${body}\n\n${url}`,
		});

		if (error) {
			console.error("Comment notification email failed to send:", error);
		}
	} catch (err) {
		console.error("Comment notification email failed to send:", err);
	}
}
