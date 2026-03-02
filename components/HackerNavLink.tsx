"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "./Link";

type HackerNavLinkProps = {
	href: string;
	title: string;
	className?: string;
	animateOnMount?: boolean;
	mountDelayMs?: number;
};

const HackerNavLink = ({
	href,
	title,
	className,
	animateOnMount = false,
	mountDelayMs = 0,
}: HackerNavLinkProps) => {
	const [displayText, setDisplayText] = useState(title);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const spanRef = useRef<HTMLSpanElement>(null);
	const naturalWidthRef = useRef<number | null>(null);
	const isAnimatingRef = useRef(false);

	const chars = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", []);

	// Measure the span's natural width after every render, but only when the
	// animation is not running (i.e. the text is the stable title). The
	// isAnimatingRef guard prevents calling getBoundingClientRect during the
	// 30ms-interval renders. This keeps naturalWidthRef accurate after pathname
	// changes (which affect the "> " active-link prefix) and after each
	// animation completes, without needing an explicit dependency array.
	useLayoutEffect(() => {
		if (spanRef.current && !isAnimatingRef.current) {
			naturalWidthRef.current = spanRef.current.getBoundingClientRect().width;
		}
	});

	const stop = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		isAnimatingRef.current = false;
		if (spanRef.current) {
			spanRef.current.style.display = "";
			spanRef.current.style.width = "";
			spanRef.current.style.overflow = "";
		}
		setDisplayText(title);
	};

	const start = () => {
		stop();
		if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
			return;
		}

		// Lock element width to prevent layout shift while uppercase scramble chars
		// temporarily render wider than the original mixed-case title.
		isAnimatingRef.current = true;
		if (spanRef.current && naturalWidthRef.current) {
			spanRef.current.style.display = "inline-block";
			spanRef.current.style.width = `${naturalWidthRef.current}px`;
			spanRef.current.style.overflow = "hidden";
		}

		let iteration = 0;
		intervalRef.current = setInterval(() => {
			setDisplayText(
				title
					.split("")
					.map((char, index) => {
						if (char === " " || char === "-") return char;
						if (index < iteration) return char;
						return chars[Math.floor(Math.random() * chars.length)] ?? char;
					})
					.join(""),
			);

			iteration += 1 / 3;
			if (iteration >= title.length) {
				stop();
			}
		}, 30);
	};

	useEffect(() => {
		setDisplayText(title);
	}, [title]);

	useEffect(() => {
		if (!animateOnMount) return;
		if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
			return;
		}

		timeoutRef.current = setTimeout(() => {
			start();
		}, mountDelayMs);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, [animateOnMount, mountDelayMs]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={className}
			onMouseEnter={start}
			onMouseLeave={stop}
			onFocus={start}
			onBlur={stop}
		>
			<span ref={spanRef} aria-hidden="true">
				{pathname === href && "> "}
				{displayText}
			</span>
			<span className="sr-only">{title}</span>
		</Link>
	);
};

export default HackerNavLink;
