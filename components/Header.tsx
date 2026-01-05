"use client";

import siteMetadata from "@/data/siteMetadata.mjs";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";
import MobileNav from "./MobileNav";
import SearchButton from "./SearchButton";
import Logo from "./Logo";
import HackerNavLink from "./HackerNavLink";

const Header = () => {
	return (
		<header
			className="sticky top-0 z-40 flex items-center justify-between py-10 backdrop-blur"
			style={{
				opacity: 0.65,
				background: `rgba(0, 14, 4, 0.8)`,
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
