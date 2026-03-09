import { slug } from "github-slugger";
import Link from "next/link";

interface Props {
	text: string;
	index?: number;
	asSpan?: boolean;
}

const TAG_COLORS = [
	// Monokai Pink
	{
		border: "border-[#f92672]/40 hover:border-[#f92672]",
		text: "text-[#f92672]",
		bg: "hover:bg-[#f92672]/10",
	},
	// Monokai Green
	{
		border: "border-[#a6e22e]/40 hover:border-[#a6e22e]",
		text: "text-[#a6e22e]",
		bg: "hover:bg-[#a6e22e]/10",
	},
	// Monokai Yellow
	{
		border: "border-[#e6db74]/40 hover:border-[#e6db74]",
		text: "text-[#e6db74]",
		bg: "hover:bg-[#e6db74]/10",
	},
	// Monokai Orange
	{
		border: "border-[#fd971f]/40 hover:border-[#fd971f]",
		text: "text-[#fd971f]",
		bg: "hover:bg-[#fd971f]/10",
	},
	// Monokai Purple
	{
		border: "border-[#ae81ff]/40 hover:border-[#ae81ff]",
		text: "text-[#ae81ff]",
		bg: "hover:bg-[#ae81ff]/10",
	},
	// Monokai Blue
	{
		border: "border-[#66d9ef]/40 hover:border-[#66d9ef]",
		text: "text-[#66d9ef]",
		bg: "hover:bg-[#66d9ef]/10",
	},
	// Monokai Light Green
	{
		border: "border-[#b6e63e]/40 hover:border-[#b6e63e]",
		text: "text-[#b6e63e]",
		bg: "hover:bg-[#b6e63e]/10",
	},
	// Monokai Coral
	{
		border: "border-[#ff6188]/40 hover:border-[#ff6188]",
		text: "text-[#ff6188]",
		bg: "hover:bg-[#ff6188]/10",
	},
	// Monokai Teal
	{
		border: "border-[#78dce8]/40 hover:border-[#78dce8]",
		text: "text-[#78dce8]",
		bg: "hover:bg-[#78dce8]/10",
	},
	// Monokai Gold
	{
		border: "border-[#ffd866]/40 hover:border-[#ffd866]",
		text: "text-[#ffd866]",
		bg: "hover:bg-[#ffd866]/10",
	},
	// Monokai Lavender
	{
		border: "border-[#ab9df2]/40 hover:border-[#ab9df2]",
		text: "text-[#ab9df2]",
		bg: "hover:bg-[#ab9df2]/10",
	},
	// Monokai Red
	{
		border: "border-[#e74c3c]/40 hover:border-[#e74c3c]",
		text: "text-[#e74c3c]",
		bg: "hover:bg-[#e74c3c]/10",
	},
	// Monokai Mint
	{
		border: "border-[#a9dc76]/40 hover:border-[#a9dc76]",
		text: "text-[#a9dc76]",
		bg: "hover:bg-[#a9dc76]/10",
	},
	// Monokai Peach
	{
		border: "border-[#fc9867]/40 hover:border-[#fc9867]",
		text: "text-[#fc9867]",
		bg: "hover:bg-[#fc9867]/10",
	},
];

const TAG_COLOR_OVERRIDES: Record<string, number> = {
	arm64: 5, // Monokai Blue
	"malware-dev": 11, // Monokai Red
	macho: 4, // Monokai Purple
	"binary-injection": 3, // Monokai Orange
	"x86-64": 8, // Monokai Teal
	linux: 1, // Monokai Green
};

function hashString(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return Math.abs(hash);
}

const Tag = ({ text, index = 0, asSpan = false }: Props) => {
	const normalizedText = slug(text);
	const overrideIndex = TAG_COLOR_OVERRIDES[normalizedText];
	const colorIndex =
		typeof overrideIndex === "number"
			? overrideIndex % TAG_COLORS.length
			: hashString(normalizedText) % TAG_COLORS.length;
	const color = TAG_COLORS[colorIndex];
	const className = `mr-2 mt-1 inline-block rounded-sm border px-2.5 py-0.5 font-mono text-xs font-semibold tracking-wider transition-colors ${color.border} ${color.text} ${color.bg}`;
	const content = text.split(" ").join("-");

	if (asSpan) {
		return <span className={className}>{content}</span>;
	}

	return (
		<Link
			href={`/writeups/tags/${slug(text)}`}
			className={className}
		>
			{content}
		</Link>
	);
};

export default Tag;
