import Hero from "@/components/Hero";
import Link from "@/components/Link";
import ProjectCard from "@/components/ProjectCard";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata.mjs";
import { formatDate } from "pliny/utils/formatDate";

const MAX_DISPLAY = 2;

export default function Home({ posts, heroFontStyles }) {
	return (
		<div className="relative">
			{/* NOTE: Animations might be a little much, also animate-blob is on a second line to get around prettier ordering error */}
			<div
				className={
					"absolute -left-60 top-20 h-[380px] w-[380px] rounded-full bg-[#E2EFB0] opacity-5 blur-3xl filter" +
					"animate-blob"
				}
			/>
			<div
				className={
					"absolute -right-20 top-60 h-[380px] w-[380px] rounded-full bg-[#B9FF46] opacity-5 blur-3xl filter" +
					"animate-blob"
				}
			/>

			<Hero heroFontStyles={heroFontStyles} />

			{/* PORTFOLIO SECTION */}
			<div className="px-4 pt-24">
				<div className="mx-auto max-w-7xl">
					<div className="mb-12 text-center">
						<p className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
							PORTFOLIO
						</p>
						<h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">
							Discover what I've created
						</h2>
						<p className="mx-auto max-w-3xl text-base text-gray-600 dark:text-gray-400 md:text-lg">
							Each piece reflects my passion for innovation and commitment to delivering
							high-quality results. Feel free to explore and get inspired!
						</p>
					</div>

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* Left Column: Large Card */}
						<div className="lg:h-full">
							<ProjectCard
								title="Tweetz"
								size="large"
								buttonText="View Writeup"
								imgSrc="/static/images/projects/tweetz.png"
								href="/writeups/tweetz"
							>
								Book a stay at our cozy hotel, enjoy the comfort, and feel at home.
							</ProjectCard>
						</div>

						{/* Right Column: Stacked Small Cards */}
						<div className="flex flex-col gap-6">
							<ProjectCard
								title="Wili Logs"
								size="small"
								buttonText="View Writeup"
								imgSrc="/static/images/projects/wilink.png"
								href="/writeups/wilink"
							>
								Discover the best video content on our streaming platform tailored to your needs.
							</ProjectCard>

							<ProjectCard
								title="42 Network"
								size="small"
								buttonText="View Writeup"
								imgSrc="/static/images/projects/42.png"
								href="/writeups/42"
							>
								Your favorite platform for watching movies and series in top quality.
							</ProjectCard>
						</div>
					</div>
				</div>
			</div>

			<div className="divide-y divide-gray-200 pt-20 dark:divide-gray-700">
				<div className="space-y-2 pb-8 pt-6 md:space-y-5">
					<h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
						Latest write ups
					</h1>
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
														{tags.map((tag) => (
															<Tag key={tag} text={tag} />
														))}
													</div>
												</div>
												<div className="prose max-w-none text-gray-500 dark:text-gray-400">
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
