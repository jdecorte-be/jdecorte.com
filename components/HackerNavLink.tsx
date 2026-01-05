"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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

	const chars = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", []);

	const stop = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setDisplayText(title);
	};

	const start = () => {
		stop();
		if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
			return;
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
					.join("")
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
			<span aria-hidden="true">
				{pathname === href && '> '}
				{displayText}
			</span>
			<span className="sr-only">{title}</span>
		</Link>
	);
};

export default HackerNavLink;
