import type { ImgHTMLAttributes } from "react";

// Widths must exist in next.config images.deviceSizes (defaults used here).
const SRCSET_WIDTHS = [640, 828, 1200, 1920];

const optimizerUrl = (src: string, w: number) =>
	`/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;

const MDXImg = ({ src, alt, ...rest }: ImgHTMLAttributes<HTMLImageElement>) => {
	if (!src || typeof src !== "string") return null;

	// Route local images through Next's image optimizer (resize + AVIF/WebP)
	// while staying a plain <img> so no width/height is required for markdown-authored images.
	const isLocal = src.startsWith("/");
	const responsiveProps = isLocal
		? {
				src: optimizerUrl(src, 1920),
				srcSet: SRCSET_WIDTHS.map((w) => `${optimizerUrl(src, w)} ${w}w`).join(
					", ",
				),
				sizes: "(max-width: 1024px) 100vw, 936px",
			}
		: { src };

	return (
		// biome-ignore lint/performance/noImgElement: markdown images have no intrinsic size, so next/image can't be used
		<img
			alt={alt ?? ""}
			loading="eager"
			decoding="async"
			{...responsiveProps}
			{...rest}
		/>
	);
};

export default MDXImg;
