"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function TransitionWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<motion.div
			key={pathname}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.2, ease: "easeInOut" }}
			style={{ minHeight: "60vh" }}
		>
			{children}
		</motion.div>
	);
}
