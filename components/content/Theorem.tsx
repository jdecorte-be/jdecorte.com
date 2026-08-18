import type { ReactNode } from "react";

/**
 * Academic-style theorem/lemma/definition box for math-heavy writeups.
 * Renders inline math inside `children` via the existing remark-math +
 * rehype-katex MDX pipeline (see contentlayer.config.ts).
 */

const defaultLabels = {
	theorem: "Theorem",
	lemma: "Lemma",
	proposition: "Proposition",
	corollary: "Corollary",
	definition: "Definition",
	claim: "Claim",
	proof: "Proof",
} as const;

type TheoremType = keyof typeof defaultLabels;

interface TheoremProps {
	type?: TheoremType;
	name?: string;
	children: ReactNode;
}

export default function Theorem({
	type = "theorem",
	name,
	children,
}: TheoremProps) {
	const label = defaultLabels[type] ?? defaultLabels.theorem;

	return (
		<div className="not-prose my-6 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-sm">
			<p className="italic leading-relaxed text-gray-200">
				<span className="font-bold not-italic text-gray-50">
					{label}
					{name ? ` (${name})` : ""}:
				</span>{" "}
				{children}
			</p>
		</div>
	);
}
