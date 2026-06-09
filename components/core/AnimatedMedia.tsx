"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedMediaProps {
	src: string;
	alt: string;
	className?: string;
}

/**
 * Smart component that auto-detects .gif and converts to video if .mp4 exists
 * Falls back to original GIF if video unavailable
 */
const AnimatedMedia = ({ src, alt, className = "" }: AnimatedMediaProps) => {
	const [useFallback, setUseFallback] = useState(false);
	const [shouldLoad, setShouldLoad] = useState(false);
	const mediaRef = useRef<HTMLVideoElement | HTMLImageElement | null>(null);

	useEffect(() => {
		const element = mediaRef.current;
		if (!element || shouldLoad) return;

		if (!("IntersectionObserver" in window)) {
			setShouldLoad(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShouldLoad(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px" },
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, [shouldLoad, src, useFallback]);

	useEffect(() => {
		const element = mediaRef.current;
		if (!(shouldLoad && element instanceof HTMLVideoElement)) return;

		element.load();
		void element.play().catch(() => {});
	}, [shouldLoad]);

	// Check if source is a GIF
	const isGif = src.endsWith(".gif");
	const mp4Src = isGif ? src.replace(/\.gif$/, ".mp4") : null;

	// Use video for GIFs if MP4 exists, otherwise fallback to GIF
	if (isGif && mp4Src && !useFallback) {
		return (
			<video
				ref={(element) => {
					mediaRef.current = element;
				}}
				autoPlay
				loop
				muted
				playsInline
				preload="none"
				className={className}
				onError={() => setUseFallback(true)}
			>
				{shouldLoad && <source src={mp4Src} type="video/mp4" />}
				{/* Fallback to GIF if MP4 fails */}
				{shouldLoad && <img src={src} alt={alt} className={className} />}
			</video>
		);
	}

	// Fallback to regular img for non-GIFs or if video fails
	return (
		<img
			ref={(element) => {
				mediaRef.current = element;
			}}
			src={shouldLoad ? src : undefined}
			alt={alt}
			className={className}
			loading="lazy"
		/>
	);
};

export default AnimatedMedia;
