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
			imgSrc: "/static/images/portfolio/badass/main.png",
			href: "",
			description: "Built and tested BGP peering scenarios to understand route propagation, filtering, and autonomous system behavior.",
			index: 0,
		},
		{
			title: "Inception Of Things (IoT)",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/iot/main.png",
			href: "",
			description: "Deployed containerized services on lightweight infrastructure with a focus on automation and observability.",
			index: 1,
		},
		{
			title: "AWS Certification",
			size: "small",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "Validated cloud fundamentals across IAM, networking, storage, and resilient architecture on AWS.",
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
			description: "Implemented a chess engine in Rust with move generation, board evaluation, and alpha-beta search.",
			index: 0,
		},
		{
			title: "Web server in C++",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/webserv/execution.png",
			href: "",
			description: "Developed an HTTP server from scratch with request parsing, routing, CGI handling, and config support.",
			index: 1,
		},
		{
			title: "Minishell in C",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/minishell/main2.png",
			href: "",
			description: "Recreated a Unix-like shell with pipelines, redirections, environment expansion, and built-in commands.",
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
			description: "Built a web dashboard to ingest, filter, and visualize application logs for faster debugging and monitoring.",
			index: 0,
		},
		{
			title: "Portfolio Website",
			size: "small",
			buttonText: "",
			imgSrc: "",
			href: "",
			description: "Designed and developed a personal site to showcase projects, writeups, and technical experiments.",
			index: 1,
		},
		{
			title: "Multiplayer Ping Pong Game",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/pong/PongGif.gif",
			href: "https://pong.jdecorte.com",
			description: "Created a real-time multiplayer pong game with matchmaking, live game state sync, and responsive controls.",
			index: 2,
		},
	],
	Cybersecurity: [
		{
			title: "d34th: A metamorphic malware",
			size: "large",
			buttonText: "",
			imgSrc: "/static/images/portfolio/death/main2.png",
			href: "",
			description: "Researched metamorphic techniques by building a proof-of-concept that mutates code while preserving behavior.",
			index: 0,
		},
		{
			title: "binary exploitation challenges",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/bin/main.png",
			href: "",
			description: "Solved pwn challenges involving stack overflows, ROP chains, and memory corruption primitives.",
			index: 1,
		},
		{
			title: "Woody Woodpacker",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/woody/main.png",
			href: "",
			description: "Built a packer that encrypts executable payloads and restores execution flow through runtime decryption.",
			index: 2,
		},
	],
};

export const CATEGORIES: Category[] = ["Network & System", "Low level", "Web Dev", "Cybersecurity"];
