"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Comments = dynamic(() => import("./Comments"), { ssr: false });

/**
 * Defers loading @giscus/react (and its iframe) until the comments
 * section scrolls near the viewport, instead of on every post page load.
 */
export default function LazyComments({ slug }: { slug: string }) {
	const [shouldLoad, setShouldLoad] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const element = containerRef.current;
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
	}, [shouldLoad]);

	return <div ref={containerRef}>{shouldLoad && <Comments slug={slug} />}</div>;
}
