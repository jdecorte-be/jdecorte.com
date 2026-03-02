"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const TRANSITION_DELAY = 200; // ms

export default function TransitionWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [displayChildren, setDisplayChildren] = useState(children);
	const [opacity, setOpacity] = useState(1);
	const prevPathname = useRef(pathname);
	const latestChildren = useRef(children);
	const swapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	latestChildren.current = children;

	// Sync children immediately when no route change (e.g. RSC streaming updates)
	useEffect(() => {
		if (prevPathname.current === pathname && !swapTimerRef.current) {
			setDisplayChildren(children);
		}
	}, [children, pathname]);

	// Handle route transitions
	useEffect(() => {
		if (prevPathname.current === pathname) return;
		prevPathname.current = pathname;

		// Cancel any pending swap from a previous navigation
		if (swapTimerRef.current) {
			clearTimeout(swapTimerRef.current);
		}

		// Fade out old content
		setOpacity(0);

		// After fade-out completes, swap content and fade in
		swapTimerRef.current = setTimeout(() => {
			setDisplayChildren(latestChildren.current);
			setOpacity(1);
			swapTimerRef.current = null;
		}, TRANSITION_DELAY);

		return () => {
			if (swapTimerRef.current) {
				clearTimeout(swapTimerRef.current);
				swapTimerRef.current = null;
			}
		};
	}, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div
			style={{
				opacity,
				transition: `opacity ${TRANSITION_DELAY}ms ease-in-out`,
				minHeight: "60vh",
			}}
		>
			{displayChildren}
		</div>
	);
}
