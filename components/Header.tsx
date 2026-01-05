"use client";

import { useEffect, useMemo, useState } from "react";
import siteMetadata from "@/data/siteMetadata.mjs";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";
import MobileNav from "./MobileNav";
import SearchButton from "./SearchButton";
import Logo from "./Logo";
import HackerNavLink from "./HackerNavLink";

const Header = () => {
	const [scrollY, setScrollY] = useState(0);
	const [isDark, setIsDark] = useState(false);

	const prefersReducedMotion = useMemo(() => {
		if (typeof window === "undefined") return true;
		return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
	}, []);

	useEffect(() => {
		if (prefersReducedMotion) return;
		let rafId = 0;
		const onScroll = () => {
			if (rafId) return;
			rafId = window.requestAnimationFrame(() => {
				rafId = 0;
				setScrollY(window.scrollY || 0);
			});
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
			if (rafId) window.cancelAnimationFrame(rafId);
		};
	}, [prefersReducedMotion]);

	useEffect(() => {
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		const read = () => setIsDark(root.classList.contains("dark"));
		read();
		const observer = new MutationObserver(read);
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	const fadeProgress = prefersReducedMotion
		? 0
		: Math.min(1, Math.max(0, scrollY / 240));
	const opacity = 1 - fadeProgress * 0.35;
	const backgroundOpacity = fadeProgress * 0.8;
	const backgroundColor = isDark
		? `rgba(0, 14, 4, ${backgroundOpacity})`
		: `rgba(255, 255, 255, ${backgroundOpacity})`;

	return (
		<header
			className="sticky top-0 z-40 flex items-center justify-between py-10 backdrop-blur"
			style={{
				opacity,
				backgroundColor,
				transition: prefersReducedMotion
					? undefined
					: "opacity 200ms ease, background-color 200ms ease",
				willChange: prefersReducedMotion ? undefined : "opacity, background-color",
			}}
		>
			<div>
				<Link href="/" aria-label={siteMetadata.headerTitle}>
					<div className="flex items-center justify-between">
						<div className="mr-3">
							<Logo />
						</div>
						{typeof siteMetadata.headerTitle === "string" ? (
							<div className="hidden h-6 text-2xl font-semibold sm:block" />
						) : (
							siteMetadata.headerTitle
						)}
					</div>
				</Link>
			</div>
			<div className="flex items-center space-x-4 leading-5 sm:space-x-6">
				{headerNavLinks
					.filter((link) => link.href !== "/")
					.map((link, index) => (
						<HackerNavLink
							key={link.title}
							href={link.href}
							title={link.title}
							className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
							animateOnMount
							mountDelayMs={index * 120}
						/>
					))}
				<SearchButton />
				{/* <ThemeSwitch /> */}
				<MobileNav />
			</div>
		</header>
	);
};

export default Header;
