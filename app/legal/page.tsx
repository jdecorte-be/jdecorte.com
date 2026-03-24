import { genPageMetadata } from "app/seo";
import Link from "@/components/core/Link";
import siteMetadata from "@/data/siteMetadata.mjs";

export const metadata = genPageMetadata({ title: "Legal notice" });

export default function LegalPage() {
	return (
		<div className="divide-y divide-gray-200 dark:divide-gray-700">
			<div className="space-y-2 pb-8 pt-6 md:space-y-5">
				<h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
					Legal notice
				</h1>
				<p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
					Legal information for this website and its publisher.
				</p>
			</div>
			<div className="py-8">
				<div className="grid gap-6 lg:grid-cols-2">
					<section className="rounded-xl border border-gray-200/80 bg-white/50 p-6 text-gray-600 shadow-sm dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-300">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Publisher
						</h2>
						<p className="mt-3">{siteMetadata.author}</p>
					</section>
					<section className="rounded-xl border border-gray-200/80 bg-white/50 p-6 text-gray-600 shadow-sm dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-300">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Contact
						</h2>
						<p className="mt-3">
							Email:{" "}
							<Link href={`mailto:${siteMetadata.email}`}>
								{siteMetadata.email}
							</Link>
						</p>
						<p className="mt-2">
							Website:{" "}
							<Link href={siteMetadata.siteUrl}>{siteMetadata.siteUrl}</Link>
						</p>
					</section>
					<section className="rounded-xl border border-gray-200/80 bg-white/50 p-6 text-gray-600 shadow-sm dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-300">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Hosting provider
						</h2>
						<p className="mt-3">Hostinger Operations, UAB</p>
						<p className="mt-2">
							Svitrigailos str. 34, Vilnius 03230, Lithuania
						</p>
						<p className="mt-2">Phone: +370 645 03378</p>
						<p className="mt-2">
							Email:{" "}
							<Link href="mailto:domains@hostinger.com">
								domains@hostinger.com
							</Link>
						</p>
						<p className="mt-2">
							Corporate officers: Daugirdas Jankus (CEO), Domantas Berzanskis
							(CFO), Aivaras Simkus (COO)
						</p>
					</section>
					<section className="rounded-xl border border-gray-200/80 bg-white/50 p-6 text-gray-600 shadow-sm dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-300">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Privacy and analytics
						</h2>
						<p className="mt-3">
							This site uses Umami analytics to understand aggregate usage (for
							example, pages viewed and device type). No advertising or
							profiling is performed.
						</p>
						<p className="mt-2">
							If you have questions about data collected, contact the publisher
							using the email above.
						</p>
					</section>
					<section className="rounded-xl border border-gray-200/80 bg-white/50 p-6 text-gray-600 shadow-sm dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-300">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Intellectual property
						</h2>
						<p className="mt-3">
							Unless otherwise stated, all content on this site is owned by the
							publisher. You may link to this site and quote brief excerpts with
							attribution. Any other reproduction or redistribution requires
							prior written permission.
						</p>
					</section>
					<section className="rounded-xl border border-gray-200/80 bg-white/50 p-6 text-gray-600 shadow-sm dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-300">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
							Liability and external links
						</h2>
						<p className="mt-3">
							The information on this site is provided for general informational
							purposes only and is provided as-is without warranty. The
							publisher is not liable for any loss or damage arising from the
							use of this site.
						</p>
						<p className="mt-2">
							This site may contain links to third-party websites. The publisher
							has no control over their content and accepts no responsibility
							for them.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
