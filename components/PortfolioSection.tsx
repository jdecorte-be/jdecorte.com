"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";

type Category = "Network" | "Low level" | "Web Development";

const projects: Record<Category, Array<{ title: string; size: "small" | "large"; buttonText: string; imgSrc: string; href: string; description: string; index: number }>> = {
	"Network": [
		{
			title: "42 Network",
			size: "large",
			buttonText: "View Writeup",
			imgSrc: "/static/images/projects/42.png",
			href: "/writeups/42",
			description: "A comprehensive network infrastructure project for distributed computing and real-time communication.",
			index: 0,
		},
		{
			title: "TCP/IP Stack",
			size: "small",
			buttonText: "View Project",
			imgSrc: "/static/images/projects/42.png",
			href: "#",
			description: "Custom implementation of TCP/IP networking protocols from scratch.",
			index: 1,
		},
		{
			title: "VPN Gateway",
			size: "small",
			buttonText: "View Project",
			imgSrc: "/static/images/projects/42.png",
			href: "#",
			description: "Secure VPN gateway with encryption and authentication mechanisms.",
			index: 2,
		},
	],
	"Low level": [
		{
			title: "MachO Injection",
			size: "large",
			buttonText: "View Writeup",
			imgSrc: "/static/images/projects/tweetz.png",
			href: "/writeups/macho-injection",
			description: "Advanced binary manipulation techniques for macOS executable injection and dynamic analysis.",
			index: 0,
		},
		{
			title: "Custom Allocator",
			size: "small",
			buttonText: "View Project",
			imgSrc: "/static/images/projects/tweetz.png",
			href: "#",
			description: "High-performance memory allocator with custom heap management strategies.",
			index: 1,
		},
		{
			title: "Kernel Module",
			size: "small",
			buttonText: "View Project",
			imgSrc: "/static/images/projects/tweetz.png",
			href: "#",
			description: "Linux kernel module for system call interception and monitoring.",
			index: 2,
		},
	],
	"Web Development": [
		{
			title: "Tweetz",
			size: "large",
			buttonText: "View Writeup",
			imgSrc: "/static/images/projects/tweetz.png",
			href: "/writeups/tweetz",
			description: "Real-time social media platform with scalable microservices architecture and WebSocket integration.",
			index: 0,
		},
		{
			title: "Wili Logs",
			size: "small",
			buttonText: "View Writeup",
			imgSrc: "/static/images/projects/wilink.png",
			href: "/writeups/wilink",
			description: "Advanced logging and monitoring dashboard with analytics and visualization.",
			index: 1,
		},
		{
			title: "E-Commerce Platform",
			size: "small",
			buttonText: "View Project",
			imgSrc: "/static/images/projects/wilink.png",
			href: "#",
			description: "Full-stack e-commerce solution with payment integration and inventory management.",
			index: 2,
		},
	],
};

export default function PortfolioSection() {
	const categories: Category[] = ["Network", "Low level", "Web Development"];

	// Animation variants from different directions
	const fadeInFromLeft = {
		hidden: { opacity: 0, x: -60 },
		visible: { 
			opacity: 1, 
			x: 0,
			transition: {
				duration: 0.7,
				ease: "easeOut" as const
			}
		}
	};

	const fadeInFromRight = {
		hidden: { opacity: 0, x: 60 },
		visible: { 
			opacity: 1, 
			x: 0,
			transition: {
				duration: 0.7,
				ease: "easeOut" as const
			}
		}
	};

	const fadeInFromTop = {
		hidden: { opacity: 0, y: -60 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: {
				duration: 0.7,
				ease: "easeOut" as const
			}
		}
	};

	const fadeInFromBottom = {
		hidden: { opacity: 0, y: 60 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: {
				duration: 0.7,
				ease: "easeOut" as const
			}
		}
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15
			}
		}
	};

	return (
		<div className="px-4 pt-24">
			<div className="mx-auto max-w-7xl">
				<motion.div 
					className="mb-12 text-center"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					variants={fadeInFromTop}
				>
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
				</motion.div>

				{/* Category Tabs */}
				<Tabs defaultValue="Network" className="w-full">
					<div className="mb-8 flex justify-center">
						<TabsList className="h-auto flex-wrap gap-1 py-1.5 px-1.5">
							{categories.map((category) => (
								<TabsTrigger key={category} value={category} className="px-3 py-1.5 text-xs sm:px-6 sm:py-2 sm:text-sm">
									{category}
								</TabsTrigger>
							))}
						</TabsList>
					</div>

					<TabsContents>
						{/* Network Layout: Large left, Small cards stacked right */}
						<TabsContent value="Network">
							<motion.div 
								className="grid grid-cols-1 gap-6 lg:grid-cols-2"
								initial="hidden"
								animate="visible"
								variants={staggerContainer}
							>
								<motion.div 
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
								</motion.div>
							<div className="flex h-full flex-col gap-6">
								{projects["Network"]
									.filter((p) => p.size === "small")
									.map((project, index) => (
										<motion.div
											key={project.title}
											className="flex-1"
												initial="hidden"
												whileInView="visible"
												viewport={{ once: true, amount: 0.2 }}
												variants={index === 0 ? fadeInFromRight : fadeInFromBottom}
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
											</motion.div>
										))}
								</div>
							</motion.div>
						</TabsContent>

						{/* Low level Layout: Small cards stacked left, Large right */}
						<TabsContent value="Low level">
							<motion.div 
								className="grid grid-cols-1 gap-6 lg:grid-cols-2"
								initial="hidden"
								animate="visible"
								variants={staggerContainer}
							>
							<div className="flex h-full flex-col gap-6">
								{projects["Low level"]
									.filter((p) => p.size === "small")
									.map((project, index) => (
										<motion.div
											key={project.title}
											className="flex-1"
												initial="hidden"
												whileInView="visible"
												viewport={{ once: true, amount: 0.2 }}
												variants={index === 0 ? fadeInFromLeft : fadeInFromBottom}
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
											</motion.div>
										))}
								</div>
								<motion.div 
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
								</motion.div>
							</motion.div>
						</TabsContent>

						{/* Web Layout: Grid with large card on top, two small cards below */}
					<TabsContent value="Web Development">
							<motion.div 
								className="flex flex-col gap-6"
								initial="hidden"
								animate="visible"
								variants={staggerContainer}
							>
								<motion.div
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true, amount: 0.2 }}
									variants={fadeInFromTop}
								>
									{projects["Web Development"]
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
								</motion.div>
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								{projects["Web Development"]
										.filter((p) => p.size === "small")
										.map((project, index) => (
											<motion.div
												key={project.title}
												initial="hidden"
												whileInView="visible"
												viewport={{ once: true, amount: 0.2 }}
												variants={index === 0 ? fadeInFromLeft : fadeInFromRight}
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
											</motion.div>
										))}
								</div>
							</motion.div>
						</TabsContent>
					</TabsContents>
				</Tabs>
			</div>
		</div>
	);
}
