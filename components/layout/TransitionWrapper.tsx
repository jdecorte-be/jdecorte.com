"use client";

import { usePathname } from "next/navigation";

export default function TransitionWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	// key={pathname} remounts the div on navigation so the CSS fade replays,
	// without pulling framer-motion into the shared layout bundle.
	return (
		<div key={pathname} className="fade-in" style={{ minHeight: "60vh" }}>
			{children}
		</div>
	);
}
