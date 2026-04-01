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
			href: "/writeups/bgp",
			description: "Built and tested BGP peering scenarios to understand route propagation, filtering, and autonomous system behavior.",
			index: 0,
		},
		{
			title: "Inception Of Things (IoT)",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/iot/main.png",
			href: "https://github.com/jdecorte-be/inception-of-things",
			description: "Deployed containerized services on lightweight infrastructure with a focus on automation and observability.",
			index: 1,
		},
		{
			title: "AWS Cloud Practitioner Certification",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/aws/main.png",
			href: "/writeups/aws-cloud-practitioner-certification",
			description: "Validated cloud fundamentals across IAM, networking, storage, and resilient architecture on AWS.",
			index: 2,
		},
	],
	"Low level": [
		{
			title: "Web server in C++",
			size: "large",
			buttonText: "",
			imgSrc: "/static/images/portfolio/webserv/main.jpg",
			href: "/writeups/webserv",
			description: "Implemented a standards-compliant HTTP/1.1 server in C++ featuring non-blocking I/O, request parsing, routing, and CGI execution.\n\nBuilt a flexible configuration system for virtual hosts, custom error pages, and limits, then validated behavior against real browser and benchmark clients.\n\nHardened the server with timeouts, error handling, and protocol edge-case tests to ensure reliable responses under load.",
			index: 0,
		},
		{
			title: "Get Next Line (GNL)",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/gnl/main.png",
			href: "/writeups/get-next-line",
			description: "Implemented the get_next_line function to read files line by line with efficient buffer management.",
			index: 1,
		},
		{
			title: "Minishell in C",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/minishell/main3.gif",
			href: "/writeups/minishell",
			description: "Recreated a Unix-like shell with pipelines, redirections, environment expansion, and built-in commands.",
			index: 2,
		},
	],
	"Web Dev": [
		{
			title: "Logs Dashboard",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/dashboard/output.gif",
			href: "https://log-dashboard.jdecorte.com/en/wili-logs/main",
			description: "Built a web dashboard to ingest, filter, and visualize application logs for faster debugging and monitoring.",
			index: 1,
		},
		{
			title: "Portfolio Website",
			size: "large",
			buttonText: "",
			imgSrc: "/static/images/portfolio/website/main2.png",
			href: "https://github.com/jdecorte-be/jdecorte.com",
			description: "Designed and developed a personal site to showcase projects, writeups, and technical experiments.",
			index: 0,
		},
		{
			title: "Multiplayer Ping Pong Game",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/pong/PongGif.gif",
			href: "https://transcendance.jdecorte.com/",
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
			href: "/writeups/x86-injection",
			description: "Built a proof-of-concept metamorphic malware that rewrites its own code on each run while keeping behavior stable.\n\nImplemented a mutation pipeline (instruction substitution, register renaming, and junk insertion) plus an injector/loader to execute the transformed payloads.\n\nAdded checks to verify output consistency across builds and to compare how different variants surface in static analysis.",
			index: 0,
		},
		{
			title: "binary exploitation challenges",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/bin/main.png",
			href: "https://github.com/jdecorte-be/binary-exploitation",
			description: "Solved pwn challenges involving stack overflows, ROP chains, and memory corruption primitives.",
			index: 1,
		},
		{
			title: "Woody Woodpacker",
			size: "small",
			buttonText: "",
			imgSrc: "/static/images/portfolio/woody/main.png",
			href: "/writeups/macho-injection",
			description: "Built a packer that encrypts executable payloads and restores execution flow through runtime decryption.",
			index: 2,
		},
	],
};

export const CATEGORIES: Category[] = ["Low level", "Web Dev", "Cybersecurity", "Network & System"];
