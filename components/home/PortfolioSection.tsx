"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { getImageProps } from "next/image";
import { useEffect } from "react";

import ProjectCard, {
	PROJECT_CARD_IMAGE_SIZES,
} from "@/components/home/ProjectCard";
import {
	fadeInFromBottom,
	fadeInFromLeft,
	fadeInFromRight,
	fadeInFromTop,
	staggerContainer,
} from "@/components/home/portfolioAnimations";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { CATEGORIES, projects } from "@/data/portfolioData";

export default function PortfolioSection() {
	// Warm the browser cache for every category's media during idle time,
	// so switching tabs shows images instantly instead of lazy-loading them.
	useEffect(() => {
		const preloadAll = () => {
			const seen = new Set<string>();
			for (const project of Object.values(projects).flat()) {
				const src = project.imgSrc;
				if (!src || seen.has(src)) continue;
				seen.add(src);

				if (src.endsWith(".mp4") || src.endsWith(".gif")) {
					// AnimatedMedia cards: warm the poster and the video itself
					const mp4Src = src.replace(/\.gif$/, ".mp4");
					new window.Image().src = mp4Src.replace(/\.mp4$/, "-poster.jpg");
					void fetch(mp4Src).catch(() => {});
				} else {
					// next/image cards: request the same optimized URL the card will use
					const { props } = getImageProps({
						alt: "",
						src,
						fill: true,
						sizes: PROJECT_CARD_IMAGE_SIZES,
					});
					const img = new window.Image();
					if (props.sizes) img.sizes = props.sizes;
					if (props.srcSet) img.srcset = props.srcSet;
					img.src = props.src;
				}
			}
		};

		if (typeof window.requestIdleCallback === "function") {
			const id = window.requestIdleCallback(preloadAll, { timeout: 3000 });
			return () => window.cancelIdleCallback(id);
		}
		const timeoutId = window.setTimeout(preloadAll, 1500);
		return () => window.clearTimeout(timeoutId);
	}, []);

	return (
		<LazyMotion features={domAnimation}>
			<div className="px-4 pt-24">
				<div className="mx-auto max-w-7xl">
					<m.div
						className="mb-12 text-center"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						variants={fadeInFromTop}
					>
						<p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary-500">
							PORTFOLIO
						</p>
						<h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-100 md:text-5xl">
							Discover what I've created
						</h2>
						<p className="mx-auto max-w-3xl text-base text-gray-400 md:text-lg">
							Each piece reflects my passion for innovation and commitment to
							delivering high-quality results. Feel free to explore and get
							inspired!
						</p>
					</m.div>

					{/* Category Tabs */}
					<Tabs defaultValue="Low level" className="w-full">
						<m.div
							className="mb-8 flex justify-center"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.5 }}
							variants={fadeInFromTop}
						>
							<TabsList className="h-auto flex-wrap gap-1 py-1.5 px-1.5">
								{CATEGORIES.map((category) => (
									<TabsTrigger
										key={category}
										value={category}
										className="px-3 py-1.5 text-xs sm:px-6 sm:py-2 sm:text-sm"
									>
										{category}
									</TabsTrigger>
								))}
							</TabsList>
						</m.div>

						<TabsContents>
							{/* Network & System Layout: Large left, Small cards stacked right */}
							<TabsContent value="Network & System">
								<m.div
									className="grid grid-cols-1 gap-6 lg:grid-cols-2"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, amount: 0.2 }}
									variants={staggerContainer}
								>
									<m.div
										className="lg:h-full"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: true, amount: 0.2 }}
										variants={fadeInFromLeft}
									>
										{projects["Network & System"]
											.filter((p) => p.size === "large")
											.map((project) => (
												<div key={project.title} className="h-full">
													<ProjectCard
														title={project.title}
														size={project.size}
														buttonText={project.buttonText}
														imgSrc={project.imgSrc}
														href={project.href}
														index={project.index}
													>
														{project.description}
													</ProjectCard>
												</div>
											))}
									</m.div>
									<div className="flex h-full flex-col gap-6">
										{projects["Network & System"]
											.filter((p) => p.size === "small")
											.map((project, index) => (
												<m.div
													key={project.title}
													className="flex-1"
													initial="hidden"
													whileInView="visible"
													viewport={{ once: true, amount: 0.2 }}
													variants={
														index === 0 ? fadeInFromRight : fadeInFromBottom
													}
												>
													<ProjectCard
														title={project.title}
														size={project.size}
														buttonText={project.buttonText}
														imgSrc={project.imgSrc}
														href={project.href}
														index={project.index}
													>
														{project.description}
													</ProjectCard>
												</m.div>
											))}
									</div>
								</m.div>
							</TabsContent>

							{/* Low level Layout: Small cards stacked left, Large right */}
							<TabsContent value="Low level">
								<m.div
									className="grid grid-cols-1 gap-6 lg:grid-cols-2"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, amount: 0.2 }}
									variants={staggerContainer}
								>
									<div className="flex h-full flex-col gap-6">
										{projects["Low level"]
											.filter((p) => p.size === "small")
											.map((project, index) => (
												<m.div
													key={project.title}
													className="flex-1"
													initial="hidden"
													whileInView="visible"
													viewport={{ once: true, amount: 0.2 }}
													variants={
														index === 0 ? fadeInFromLeft : fadeInFromBottom
													}
												>
													<ProjectCard
														title={project.title}
														size={project.size}
														buttonText={project.buttonText}
														imgSrc={project.imgSrc}
														href={project.href}
														index={project.index}
													>
														{project.description}
													</ProjectCard>
												</m.div>
											))}
									</div>
									<m.div
										className="lg:h-full"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: true, amount: 0.2 }}
										variants={fadeInFromRight}
									>
										{projects["Low level"]
											.filter((p) => p.size === "large")
											.map((project) => (
												<div key={project.title} className="h-full">
													<ProjectCard
														title={project.title}
														size={project.size}
														buttonText={project.buttonText}
														imgSrc={project.imgSrc}
														href={project.href}
														index={project.index}
													>
														{project.description}
													</ProjectCard>
												</div>
											))}
									</m.div>
								</m.div>
							</TabsContent>

							{/* Web Layout: Grid with large card on top, two small cards below */}
							<TabsContent value="Web Dev">
								<m.div
									className="flex flex-col gap-6"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, amount: 0.2 }}
									variants={staggerContainer}
								>
									<m.div
										initial="hidden"
										whileInView="visible"
										viewport={{ once: true, amount: 0.2 }}
										variants={fadeInFromTop}
									>
										{projects["Web Dev"]
											.filter((p) => p.size === "large")
											.map((project) => (
												<ProjectCard
													key={project.title}
													title={project.title}
													size={project.size}
													buttonText={project.buttonText}
													imgSrc={project.imgSrc}
													href={project.href}
													index={project.index}
												>
													{project.description}
												</ProjectCard>
											))}
									</m.div>
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
										{projects["Web Dev"]
											.filter((p) => p.size === "small")
											.map((project, index) => (
												<m.div
													key={project.title}
													initial="hidden"
													whileInView="visible"
													viewport={{ once: true, amount: 0.2 }}
													variants={
														index === 0 ? fadeInFromLeft : fadeInFromRight
													}
												>
													<ProjectCard
														title={project.title}
														size={project.size}
														buttonText={project.buttonText}
														imgSrc={project.imgSrc}
														href={project.href}
														index={project.index}
													>
														{project.description}
													</ProjectCard>
												</m.div>
											))}
									</div>
								</m.div>
							</TabsContent>

							{/* Cybersecurity Layout: Large left, Small cards stacked right */}
							<TabsContent value="Cybersecurity">
								<m.div
									className="grid grid-cols-1 gap-6 lg:grid-cols-2"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, amount: 0.2 }}
									variants={staggerContainer}
								>
									<m.div
										className="lg:h-full"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: true, amount: 0.2 }}
										variants={fadeInFromLeft}
									>
										{projects["Cybersecurity"]
											.filter((p) => p.size === "large")
											.map((project) => (
												<div key={project.title} className="h-full">
													<ProjectCard
														title={project.title}
														size={project.size}
														buttonText={project.buttonText}
														imgSrc={project.imgSrc}
														href={project.href}
														index={project.index}
													>
														{project.description}
													</ProjectCard>
												</div>
											))}
									</m.div>
									<div className="flex h-full flex-col gap-6">
										{projects["Cybersecurity"]
											.filter((p) => p.size === "small")
											.map((project, index) => (
												<m.div
													key={project.title}
													className="flex-1"
													initial="hidden"
													whileInView="visible"
													viewport={{ once: true, amount: 0.2 }}
													variants={
														index === 0 ? fadeInFromRight : fadeInFromBottom
													}
												>
													<ProjectCard
														title={project.title}
														size={project.size}
														buttonText={project.buttonText}
														imgSrc={project.imgSrc}
														href={project.href}
														index={project.index}
													>
														{project.description}
													</ProjectCard>
												</m.div>
											))}
									</div>
								</m.div>
							</TabsContent>
						</TabsContents>
					</Tabs>
				</div>
			</div>
		</LazyMotion>
	);
}
