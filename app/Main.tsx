import Hero from "@/components/Hero";
import Link from "@/components/Link";
import Tag from "@/components/Tag";
import Image from "@/components/Image";
import siteMetadata from "@/data/siteMetadata.mjs";
import workData, { educationData } from "@/data/workData";
import { formatDate } from "pliny/utils/formatDate";

const MAX_DISPLAY = 2;

// Helpers for brand-aware backgrounds
const getBrandColor = (title: string): string => {
	switch (title) {
		case "Sensible":
			return "#16a34a"; // emerald-600
		case "Newfront Insurance":
			return "#2563eb"; // blue-600
		default:
			return "#6b7280"; // gray-500
	}
};

const hexToRgba = (hex: string, alpha: number): string => {
	const normalized = hex.replace("#", "");
	const bigint = parseInt(normalized, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

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

			{/* RESUME */}
			<div className="pt-20">
				<div className="mt-10 grid gap-10 md:grid-cols-3">
					{/* Experience timeline */}
					<div className="md:col-span-2">
						<h2 className="mb-5 text-2xl font-bold">Experience</h2>
						<div className="relative">
							<div className="absolute left-4 top-0 h-full w-px bg-gray-200 dark:bg-gray-700" />
							<ul className="space-y-6">
								{workData.map((role) => (
									<li key={role.title} className="relative pl-10">
										{/* timeline dot */}
										<span className="absolute left-2 top-3 inline-block h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary-500 ring-4 ring-white dark:ring-gray-900" />
										<div className="group rounded-xl border border-gray-200/70 bg-white/70 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/40 transition hover:shadow-md hover:border-primary-200 dark:border-gray-700/60 dark:bg-gray-900/40 dark:hover:border-primary-800">
											<div className="flex items-start justify-between gap-4">
												<div className="flex-1">
													<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
														{role.href ? (
															<Link href={role.href} className="hover:text-primary-600 dark:hover:text-primary-400">{role.title}</Link>
														) : (
															role.title
														)}
													</h3>
													{role.href && (
														<div className="mt-1">
															<Link
																href={role.href}
																aria-label={`Visit ${role.title}`}
																className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
															>
																Visit <span aria-hidden>→</span>
															</Link>
														</div>
													)}
												</div>
												{role.imgSrc && (
													<div
														className="shrink-0 grid h-14 w-14 place-items-center rounded-lg border border-gray-200/70 bg-gradient-to-br from-white to-gray-100 p-1 shadow-sm ring-1 ring-gray-900/5 dark:border-gray-700/60 dark:from-gray-800 dark:to-gray-900 dark:shadow-none dark:ring-white/10"
														style={{ backgroundImage: `linear-gradient(135deg, ${hexToRgba(getBrandColor(role.title), 0.18)} 0%, transparent 100%)` }}
													>
														<Image alt={role.title} src={role.imgSrc} width={40} height={40} className="max-h-10 max-w-10 object-contain" />
													</div>
												)}
											</div>
											<p className="prose prose-sm mt-4 max-w-none leading-relaxed text-gray-700 dark:text-gray-300">
												{role.description}
											</p>
										</div>
									</li>
								))}
							</ul>
						</div>

						<div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-green-900 to-transparent" />

						{/* Education */}
						<h2 className="mb-5 text-2xl font-bold">Education</h2>
						<div className="space-y-4">
							{educationData.map((edu) => (
								<div key={edu.institution} className="group rounded-xl border border-gray-200/70 bg-white/60 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/40 hover:shadow-md dark:border-gray-700/60 dark:bg-gray-900/40">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
												{edu.href ? (
													<Link href={edu.href}>{edu.institution}</Link>
												) : (
													edu.institution
												)}
											</h3>
											<p className="mt-1 text-lg font-medium text-gray-700 dark:text-gray-300">
												{edu.degree} in {edu.field}
											</p>
											<p className="text-sm text-gray-500 dark:text-gray-400">
												{edu.year}
											</p>
											{edu.description && (
												<p className="mt-3 text-gray-600 dark:text-gray-300">
													{edu.description}
												</p>
											)}
										</div>
										{edu.imgSrc && (
											<div className="shrink-0 overflow-hidden rounded-md border border-gray-200/70 bg-white/40 p-1 dark:border-gray-700/60 dark:bg-gray-900/40">
												<Image alt={edu.institution} src={edu.imgSrc} width={40} height={40} className="h-10 w-10 object-contain" />
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
					
					{/* Sidebar */}
					<div className="md:col-span-1">
						{/* Contact Information */}
						<div className="mb-8">
							<h2 className="mb-5 text-2xl font-bold">Contact</h2>
							<div className="space-y-3">
								<div className="rounded-lg border border-gray-200/70 bg-white/60 p-4 backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/40">
									<p className="text-sm font-medium text-gray-900 dark:text-gray-100">jdecorte@proton.me</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">+32 468 25 87 91</p>
								</div>
							</div>
						</div>

						{/* Social Links */}
						<div className="mb-8">
							<h2 className="mb-5 text-2xl font-bold">Social</h2>
							<div className="space-y-3">
								<Link
									href="https://github.com/jdecorte-be"
									className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200/70 bg-white/60 px-4 py-2 font-medium text-gray-900 shadow-sm backdrop-blur hover:bg-white/80 dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-100"
								>
									GitHub
								</Link>
								<Link
									href="https://linkedin.com/in/johndecorte"
									className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200/70 bg-white/60 px-4 py-2 font-medium text-gray-900 shadow-sm backdrop-blur hover:bg-white/80 dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-100"
								>
									LinkedIn
								</Link>
							</div>
						</div>

						{/* Skills Sections */}
						<div className="space-y-6">
							{/* Soft Skills */}
							<div>
								<h3 className="mb-3 text-lg font-semibold">Soft Skills</h3>
								<div className="flex flex-wrap gap-2">
									{["Problem solving", "Adaptability", "Teamwork"].map((skill) => (
										<span key={skill} className="rounded-full border border-gray-200/70 bg-white/60 px-3 py-1 text-sm text-gray-700 backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-300">
											{skill}
										</span>
									))}
								</div>
							</div>

							{/* Code Skills */}
							<div>
								<h3 className="mb-3 text-lg font-semibold">Code Skills</h3>
								<div className="flex flex-wrap gap-2">
									{["C/C++", "C# (.NET)", "Python", "ASM(x86-64)", "React", "TypeScript", "JavaScript"].map((skill) => (
										<span key={skill} className="rounded-full border border-gray-200/70 bg-white/60 px-3 py-1 text-sm text-gray-700 backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-300">
											{skill}
										</span>
									))}
								</div>
							</div>

							{/* Tools & Techs */}
							<div>
								<h3 className="mb-3 text-lg font-semibold">Tools & Techs</h3>
								<div className="flex flex-wrap gap-2">
									{["Git", "Docker", "Kubernetes", "Figma", "PostgreSQL", "AWS", "MongoDB", "GraphQL"].map((skill) => (
										<span key={skill} className="rounded-full border border-gray-200/70 bg-white/60 px-3 py-1 text-sm text-gray-700 backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/40 dark:text-gray-300">
											{skill}
										</span>
									))}
								</div>
							</div>

							{/* Languages */}
							<div>
								<h3 className="mb-3 text-lg font-semibold">Languages</h3>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span className="text-sm text-gray-700 dark:text-gray-300">French</span>
										<span className="text-xs text-gray-500 dark:text-gray-400">native</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm text-gray-700 dark:text-gray-300">English</span>
										<span className="text-xs text-gray-500 dark:text-gray-400">professional</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="divide-y divide-gray-200 pt-20 dark:divide-gray-700">
				<div className="space-y-2 pb-8 pt-6 md:space-y-5">
					<h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
						Latest articles
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
																	href={`/thoughts/${slug}`}
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
															href={`/thoughts/${slug}`}
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
						href="/thoughts"
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
