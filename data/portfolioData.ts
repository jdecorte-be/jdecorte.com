export type Category = "Network & System" | "Low level" | "Web Dev" | "Cybersecurity";

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
	"Network & System": [
		{
			title: "Bgp At Doors of Autonomous Systems is Simple (BADASS)",
			size: "large",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "",
			index: 0,
		},
		{
			title: "Inception Of Things (IoT)",
			size: "small",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "",
			index: 1,
		},
		{
			title: "AWS Certification",
			size: "small",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "",
			index: 2,
		},
	],
	"Low level": [
		{
			title: "Rust Chess Engine",
			size: "large",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "",
			index: 0,
		},
		{
			title: "Web server in C++",
			size: "small",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "",
			index: 1,
		},
		{
			title: "Minishell in C",
			size: "small",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "",
			index: 2,
		},
	],
	"Web Dev": [
		{
			title: "Logs Dashboard",
			size: "large",
			buttonText: "",
			imgSrc: "",
			href: "https://log-dashboard.jdecorte.com/en/login",
			description: "",
			index: 0,
		},
		{
			title: "Portfolio Website",
			size: "small",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "",
			index: 1,
		},
		{
			title: "Multiplayer Ping Pong Game",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/pong/PongGif.gif",
			href: "https://pong.jdecorte.com",
			description: "",
			index: 2,
		},
	],
	Cybersecurity: [
		{
			title: "d34th: A metamorphic malware",
			size: "large",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "",
			index: 0,
		},
		{
			title: "binary exploitation challenges",
			size: "small",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "",
			index: 1,
		},
		{
			title: "Woody Woodpacker",
			size: "small",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "",
			index: 2,
		},
	],
};

export const CATEGORIES: Category[] = ["Network & System", "Low level", "Web Dev", "Cybersecurity"];
