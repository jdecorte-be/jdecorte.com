"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

import ProjectCard from "@/components/ProjectCard";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import {
	fadeInFromBottom,
	fadeInFromLeft,
	fadeInFromRight,
	fadeInFromTop,
	staggerContainer,
} from "@/components/portfolioAnimations";
import { CATEGORIES, projects } from "@/data/portfolioData";

export default function PortfolioSection() {
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
							{/* Network Layout: Large left, Small cards stacked right */}
							<TabsContent value="Network">
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
										{projects["Network"]
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
										{projects["Network"]
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
						</TabsContents>
					</Tabs>
				</div>
			</div>
		</LazyMotion>
	);
}
