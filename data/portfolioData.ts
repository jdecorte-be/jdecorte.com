export type Category = "Network" | "Low level" | "Web Development";

export type Project = {
	title: string;
	size: "small" | "large";
	buttonText: string;
	imgSrc: string;
	href: string;
	description: string;
	index: number;
};

export const projects: Record<Category, Project[]> = {
	Network: [
		{
			title: "42 Network",
			size: "large",
			buttonText: "View Writeup",
			imgSrc: "",
			href: "/writeups/42",
			description:
				"A comprehensive network infrastructure project for distributed computing and real-time communication.",
			index: 0,
		},
		{
			title: "TCP/IP Stack",
			size: "small",
			buttonText: "View Project",
			imgSrc: "",
			href: "#",
			description:
				"Custom implementation of TCP/IP networking protocols from scratch.",
			index: 1,
		},
		{
			title: "VPN Gateway",
			size: "small",
			buttonText: "View Project",
			imgSrc: "",
			href: "#",
			description:
				"Secure VPN gateway with encryption and authentication mechanisms.",
			index: 2,
		},
	],
	"Low level": [
		{
			title: "MachO Injection",
			size: "large",
			buttonText: "View Writeup",
			imgSrc: "",
			href: "/writeups/macho-injection",
			description:
				"Advanced binary manipulation techniques for macOS executable injection and dynamic analysis.",
			index: 0,
		},
		{
			title: "Custom Allocator",
			size: "small",
			buttonText: "View Project",
			imgSrc: "",
			href: "#",
			description:
				"High-performance memory allocator with custom heap management strategies.",
			index: 1,
		},
		{
			title: "Kernel Module",
			size: "small",
			buttonText: "View Project",
			imgSrc: "",
			href: "#",
			description:
				"Linux kernel module for system call interception and monitoring.",
			index: 2,
		},
	],
	"Web Development": [
		{
			title: "Tweetz",
			size: "large",
			buttonText: "View Writeup",
			imgSrc: "",
			href: "/writeups/tweetz",
			description:
				"Real-time social media platform with scalable microservices architecture and WebSocket integration.",
			index: 0,
		},
		{
			title: "Wili Logs",
			size: "small",
			buttonText: "View Writeup",
			imgSrc: "",
			href: "/writeups/wilink",
			description:
				"Advanced logging and monitoring dashboard with analytics and visualization.",
			index: 1,
		},
		{
			title: "E-Commerce Platform",
			size: "small",
			buttonText: "View Project",
			imgSrc: "",
			href: "#",
			description:
				"Full-stack e-commerce solution with payment integration and inventory management.",
			index: 2,
		},
	],
};

export const CATEGORIES: Category[] = ["Network", "Low level", "Web Development"];
