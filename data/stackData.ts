import {
	BookOpen,
	Database,
	FileCode2,
	GitBranch,
	type LucideIcon,
	Palette,
	Rocket,
	Layers as StackIcon,
	Wand2,
	Wrench,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
	SiBiome,
	SiBun,
	SiGithubactions,
	SiMdx,
	SiMongodb,
	SiNextdotjs,
	SiRadixui,
	SiRailway,
	SiReact,
	SiResend,
	SiShadcnui,
	SiTailwindcss,
	SiTypescript,
	SiVercel,
} from "react-icons/si";

export interface StackItem {
	id: string;
	name: string;
	description: string;
	icon: IconType | LucideIcon;
}

export interface StackCategory {
	id: string;
	name: string;
	color: string;
	icon: LucideIcon;
	description: string;
	items: StackItem[];
}

export const stackCategories: StackCategory[] = [
	{
		id: "core",
		name: "Core",
		color: "#3987e5",
		icon: StackIcon,
		description: "The framework and language the site is built on.",
		items: [
			{
				id: "nextjs",
				name: "Next.js",
				description: "App Router + React Server Components, on the 16.x line.",
				icon: SiNextdotjs,
			},
			{
				id: "react",
				name: "React",
				description: "UI library — React 19.",
				icon: SiReact,
			},
			{
				id: "typescript",
				name: "TypeScript",
				description: "Typed JavaScript across the whole codebase.",
				icon: SiTypescript,
			},
		],
	},
	{
		id: "content",
		name: "Content",
		color: "#199e70",
		icon: FileCode2,
		description: "How writeups and pages get authored and typed.",
		items: [
			{
				id: "contentlayer",
				name: "Contentlayer2",
				description: "Turns MDX writeups into type-safe content at build time.",
				icon: FileCode2,
			},
			{
				id: "mdx",
				name: "MDX",
				description: "Markdown + JSX for writeups and long-form content.",
				icon: SiMdx,
			},
			{
				id: "pliny",
				name: "Pliny",
				description: "Blog utilities — analytics wiring, search, newsletter.",
				icon: BookOpen,
			},
		],
	},
	{
		id: "styling",
		name: "Styling & UI",
		color: "#d95926",
		icon: Palette,
		description: "Design system and motion on top of the framework.",
		items: [
			{
				id: "tailwind",
				name: "Tailwind CSS",
				description: "Utility-first styling for the entire UI.",
				icon: SiTailwindcss,
			},
			{
				id: "shadcn",
				name: "shadcn/ui",
				description: "Accessible component primitives, styled in-repo.",
				icon: SiShadcnui,
			},
			{
				id: "radix",
				name: "Radix UI",
				description: "Unstyled, accessible primitives (tabs, avatar, etc).",
				icon: SiRadixui,
			},
			{
				id: "motion",
				name: "Motion",
				description: "Animations — this graph included.",
				icon: Wand2,
			},
		],
	},
	{
		id: "data",
		name: "Data & Backend",
		color: "#e66767",
		icon: Database,
		description: "Where state and outbound email live.",
		items: [
			{
				id: "mongodb",
				name: "MongoDB",
				description: "Stores view counts and site stats.",
				icon: SiMongodb,
			},
			{
				id: "resend",
				name: "Resend",
				description: "Sends the weekly stats email digest.",
				icon: SiResend,
			},
		],
	},
	{
		id: "tooling",
		name: "Tooling",
		color: "#9085e9",
		icon: Wrench,
		description: "Package management, linting, and git hooks.",
		items: [
			{
				id: "bun",
				name: "Bun",
				description: "Package manager and JS runtime.",
				icon: SiBun,
			},
			{
				id: "biome",
				name: "Biome",
				description: "Linting and formatting.",
				icon: SiBiome,
			},
			{
				id: "husky",
				name: "Husky",
				description: "Git hooks — lint-staged runs on every commit.",
				icon: GitBranch,
			},
		],
	},
	{
		id: "deploy",
		name: "Deploy & Infra",
		color: "#008300",
		icon: Rocket,
		description: "How the site ships and gets watched in production.",
		items: [
			{
				id: "vercel",
				name: "Vercel",
				description: "Analytics and Speed Insights.",
				icon: SiVercel,
			},
			{
				id: "railway",
				name: "Railway",
				description: "Nixpacks build pipeline and hosting.",
				icon: SiRailway,
			},
			{
				id: "actions",
				name: "GitHub Actions",
				description: "Runs the weekly stats email cron job.",
				icon: SiGithubactions,
			},
		],
	},
];
