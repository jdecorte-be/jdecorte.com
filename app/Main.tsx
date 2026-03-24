import { formatDate } from "pliny/utils/formatDate";
import Tag from "@/components/content/Tag";
import Link from "@/components/core/Link";
import GithubContributions from "@/components/home/GithubContributions";
import Hero from "@/components/home/Hero";
import PortfolioSection from "@/components/home/PortfolioSection";
import siteMetadata from "@/data/siteMetadata.mjs";

const MAX_DISPLAY = 2;

export default function Home({ posts, heroFontStyles }) {
	return (
		<div className="relative">
			{/* NOTE: Animations might be a little much, also animate-blob is on a second line to get around prettier ordering error */}
			<div
				className={
					"absolute -left-60 top-20 h-[380px] w-[380px] rounded-full bg-white opacity-5 blur-3xl filter" +
					"animate-blob"
				}
			/>
			<div
				className={
					"absolute -right-20 top-60 h-[380px] w-[380px] rounded-full bg-white opacity-5 blur-3xl filter" +
					"animate-blob"
				}
			/>

			<Hero heroFontStyles={heroFontStyles} />

			<PortfolioSection />

			<div className="pt-20">
				<div className="space-y-2 pb-8 pt-6 text-center md:space-y-5">
					<h2 className="text-2xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-9 md:text-3xl md:leading-10">
						My Open Source Journey
					</h2>
					<p className="text-base leading-6 text-gray-500 dark:text-gray-400">
						Each green square represents a day of contribution, a step towards
						better software for everyone.
					</p>
				</div>
				<div className="flex justify-center">
					<GithubContributions username="jdecorte-be" />
				</div>
			</div>

			<div className="divide-y divide-gray-200 pt-20 dark:divide-gray-700">
				<div className="space-y-2 pb-8 pt-6 md:space-y-5">
					<h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
						Latest write ups
					</h2>
				</div>
				{/* POSTS */}
				<ul className="divide-y divide-gray-200 dark:divide-gray-700">
					{!posts.length && "No posts found."}
					{posts.slice(0, MAX_DISPLAY).map((post) => {
						const { slug, date, title, summary, tags } = post;
						return (
							<li key={slug} className="py-12">
								<article>
									<div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
										<dl>
											<dt className="sr-only">Published on</dt>
											<dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
												<time dateTime={date}>
													{formatDate(date, siteMetadata.locale)}
												</time>
											</dd>
										</dl>
										<div className="space-y-5 xl:col-span-3">
											<div className="space-y-6">
												<div>
													<h2 className="text-2xl font-bold leading-8 tracking-tight">
														<Link
															href={`/writeups/${slug}`}
															className="text-gray-900 dark:text-gray-100"
														>
															{title}
														</Link>
													</h2>
													<div className="flex flex-wrap">
														{tags.map((tag, i) => (
															<Tag key={tag} text={tag} index={i} />
														))}
													</div>
												</div>
												<div className="prose max-w-none overflow-x-hidden text-gray-500 dark:text-gray-400">
													{summary}
												</div>
											</div>
											<div className="text-base font-medium leading-6">
												<Link
													href={`/writeups/${slug}`}
													className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
													aria-label={`Read more: "${title}"`}
												>
													Read more &rarr;
												</Link>
											</div>
										</div>
									</div>
								</article>
							</li>
						);
					})}
				</ul>
			</div>
			{posts.length > MAX_DISPLAY && (
				<div className="flex justify-end text-base font-medium leading-6">
					<Link
						href="/writeups"
						className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
						aria-label="All posts"
					>
						All Posts &rarr;
					</Link>
				</div>
			)}
		</div>
	);
}
