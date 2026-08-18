const ESCAPE_MAP: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};

export function escapeHtml(input: string): string {
	return input.replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch]);
}

// Only allow schemes that can't execute script (no `javascript:`, `data:`, etc).
const SAFE_URL_PATTERN = /^(https?:|mailto:)/i;

// Private-use-area character: essentially impossible to collide with real
// comment text, unlike a plain-ASCII placeholder a user could type verbatim.
const CODE_PLACEHOLDER = "";

/**
 * Renders a small, safe subset of Markdown (bold, italic, inline code, links)
 * to an HTML string. Input is HTML-escaped up front, so only the tags this
 * function explicitly introduces can ever appear in the output — safe to
 * pass to dangerouslySetInnerHTML.
 */
export function renderCommentMarkdown(raw: string): string {
	const escaped = escapeHtml(raw);

	// Pull code spans out first so their contents are immune to the other
	// replacements below, then restore them at the end.
	const codeSpans: string[] = [];
	const withCode = escaped.replace(/`([^`\n]+)`/g, (_match, code: string) => {
		const index = codeSpans.push(code) - 1;
		return `${CODE_PLACEHOLDER}${index}${CODE_PLACEHOLDER}`;
	});

	const withLinks = withCode.replace(
		/\[([^\]\n]+)\]\((\S+?)\)/g,
		(match, text: string, url: string) =>
			SAFE_URL_PATTERN.test(url)
				? `<a href="${url}" target="_blank" rel="noopener noreferrer nofollow ugc">${text}</a>`
				: match,
	);

	const withBold = withLinks.replace(
		/\*\*([^*\n]+)\*\*/g,
		"<strong>$1</strong>",
	);

	const withItalic = withBold
		.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>")
		.replace(/\b_([^_\n]+)_\b/g, "<em>$1</em>");

	const codePlaceholderPattern = new RegExp(
		`${CODE_PLACEHOLDER}(\\d+)${CODE_PLACEHOLDER}`,
		"g",
	);
	const withRestoredCode = withItalic.replace(
		codePlaceholderPattern,
		(_match, idx: string) => `<code>${codeSpans[Number(idx)]}</code>`,
	);

	return withRestoredCode
		.split(/\n{2,}/)
		.map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
		.join("");
}
