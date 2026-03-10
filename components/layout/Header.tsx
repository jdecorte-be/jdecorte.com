import Link from "@/components/core/Link";
import Logo from "@/components/core/Logo";
import HackerNavLink from "@/components/navigation/HackerNavLink";
import MobileNav from "@/components/navigation/MobileNav";
import SearchButton from "@/components/navigation/SearchButton";
import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata.mjs";

const Header = () => {
	return (
		<header
			className="sticky top-0 z-40 w-full backdrop-blur-sm"
			style={{
				background: "rgba(15, 16, 21, 0.43)",
				boxShadow: `0 1px 2px rgba(0, 14, 4, 0.1)`,
				borderBottom: `1px solid rgba(0, 14, 4, 0.1)`,
			}}
		>
			<div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-8 sm:px-6 xl:max-w-5xl xl:px-0">
				<div>
					<Link href="/" aria-label={siteMetadata.headerTitle}>
						<div className="flex items-center justify-between">
							<div className="mr-3 flex h-6">
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
			</div>
		</header>
	);
};

export default Header;
