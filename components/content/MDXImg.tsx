import type { ImgHTMLAttributes } from "react";

const MDXImg = ({ src, alt, ...rest }: ImgHTMLAttributes<HTMLImageElement>) => {
	if (!src || typeof src !== "string") return null;

	// Route local images through Next's image optimizer (resize + AVIF/WebP)
	// while staying a plain <img> so no width/height is required for markdown-authored images.
	const optimizedSrc = src.startsWith("/")
		? `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`
		: src;

	return (
		// biome-ignore lint/a11y/useAltText: alt comes from markdown source
		<img src={optimizedSrc} alt={alt ?? ""} loading="lazy" decoding="async" {...rest} />
	);
};

export default MDXImg;
