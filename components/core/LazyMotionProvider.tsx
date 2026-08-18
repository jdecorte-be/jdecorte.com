"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

// Loads the animation feature bundle as its own chunk instead of bundling it
// eagerly with every `motion.*` usage — pair with `m.*` components, not `motion.*`.
const loadFeatures = () => import("motion/react").then((mod) => mod.domMax);

export default function LazyMotionProvider({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<LazyMotion features={loadFeatures} strict>
			{children}
		</LazyMotion>
	);
}
