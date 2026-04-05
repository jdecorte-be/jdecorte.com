"use client";

import { useState } from "react";

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
	
	// Check if source is a GIF
	const isGif = src.endsWith(".gif");
	const mp4Src = isGif ? src.replace(/\.gif$/, ".mp4") : null;

	// Use video for GIFs if MP4 exists, otherwise fallback to GIF
	if (isGif && mp4Src && !useFallback) {
		return (
			<video
				autoPlay
				loop
				muted
				playsInline
				className={className}
				onError={() => setUseFallback(true)}
			>
				<source src={mp4Src} type="video/mp4" />
				{/* Fallback to GIF if MP4 fails */}
				<img src={src} alt={alt} className={className} />
			</video>
		);
	}

	// Fallback to regular img for non-GIFs or if video fails
	return <img src={src} alt={alt} className={className} />;
};

export default AnimatedMedia;
