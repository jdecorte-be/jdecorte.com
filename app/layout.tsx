import "css/tailwind.css";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Roboto_Mono, Space_Grotesk } from "next/font/google";
import { Analytics, type AnalyticsConfig } from "pliny/analytics";
import { Suspense } from "react";
import UmamiPageview from "@/components/analytics/UmamiPageview";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SectionContainer from "@/components/layout/SectionContainer";
import TransitionWrapper from "@/components/layout/TransitionWrapper";
import { CustomKBarSearchProvider } from "@/components/navigation/CustomKBarSearch";
import siteMetadata from "@/data/siteMetadata.mjs";
import { ThemeProviders } from "./theme-providers";

const space_grotesk = Space_Grotesk({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-space-grotesk",
});

const roboto_mono = Roboto_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
	metadataBase: new URL(siteMetadata.siteUrl),
	title: {
		default: siteMetadata.title,
		template: `%s | John Decorte`,
	},
	description: siteMetadata.description,
	openGraph: {
		title: siteMetadata.title,
		description: siteMetadata.description,
		url: "./",
		siteName: siteMetadata.title,
		images: [siteMetadata.socialBanner],
		locale: siteMetadata.locale,
		type: "website",
	},
	alternates: {
		canonical: "./",
		types: {
			"application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
		},
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: siteMetadata.title,
		card: "summary_large_image",
		images: [siteMetadata.socialBanner],
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang={siteMetadata.language}
			className={`${space_grotesk.variable} ${roboto_mono.variable} scroll-smooth dark overflow-x-hidden`}
			suppressHydrationWarning
		>
			<link
				rel="apple-touch-icon"
				sizes="76x76"
				href="/static/favicons/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/static/favicons/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/static/favicons/favicon-16x16.png"
			/>
			<link rel="manifest" href="/static/favicons/site.webmanifest" />
			<link
				rel="mask-icon"
				href="/static/favicons/safari-pinned-tab.svg"
				color="#5bbad5"
			/>
			<meta name="msapplication-TileColor" content="#000000" />
			<meta name="theme-color" content="#000000" />
			<link rel="alternate" type="application/rss+xml" href="/feed.xml" />
			<body className="overflow-x-hidden bg-[color:var(--background)] text-white antialiased">
				<ThemeProviders>
					<Analytics
						analyticsConfig={siteMetadata.analytics as AnalyticsConfig}
					/>
					<Suspense fallback={null}>
						<UmamiPageview />
					</Suspense>
					<div className="flex min-h-screen flex-col font-sans">
						<CustomKBarSearchProvider
							searchConfig={
								siteMetadata.search as {
									provider: "kbar";
									kbarConfig: { searchDocumentsPath: string };
								}
							}
						>
							<Header />
							<SectionContainer>
								<main className="flex-1 px-4 sm:px-6 lg:px-8">
									<TransitionWrapper>{children}</TransitionWrapper>
								</main>
								<div className="mt-auto">
									<Footer />
								</div>
							</SectionContainer>
						</CustomKBarSearchProvider>
					</div>
				</ThemeProviders>
			</body>
		</html>
	);
}
