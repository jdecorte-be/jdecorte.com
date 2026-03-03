import "css/tailwind.css";

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics, type AnalyticsConfig } from "pliny/analytics";
import { CustomKBarSearchProvider } from "@/components/CustomKBarSearch";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SectionContainer from "@/components/SectionContainer";
import TransitionWrapper from "@/components/TransitionWrapper";
import siteMetadata from "@/data/siteMetadata.mjs";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MaintenancePage from "./maintenance";
import { ThemeProviders } from "./theme-providers";

const space_grotesk = Space_Grotesk({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
	metadataBase: new URL(siteMetadata.siteUrl),
	title: {
		default: siteMetadata.title,
		template: `%s | ${siteMetadata.title}`,
	},
	description: siteMetadata.description,
	openGraph: {
		title: siteMetadata.title,
		description: siteMetadata.description,
		url: "./",
		siteName: siteMetadata.title,
		images: [siteMetadata.socialBanner],
		locale: "en_CA",
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
	const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
	if (isMaintenanceMode) {
		return (
			<html>
				<body>
					<MaintenancePage />
				</body>
			</html>
		);
	}

	return (
		<html
			lang={siteMetadata.language}
			className={`${space_grotesk.variable} scroll-smooth dark overflow-x-hidden`}
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
					<SpeedInsights />
					<VercelAnalytics />
					<Analytics
						analyticsConfig={siteMetadata.analytics as AnalyticsConfig}
					/>
					<div className="flex h-screen flex-col justify-between font-sans">
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
								<main className="mb-auto">
									<TransitionWrapper>{children}</TransitionWrapper>
								</main>
								<Footer />
							</SectionContainer>
						</CustomKBarSearchProvider>
					</div>
				</ThemeProviders>
			</body>
		</html>
	);
}
