import type { Variants } from "framer-motion";

export const fadeInFromLeft: Variants = {
	hidden: { opacity: 0, x: -200 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			opacity: { duration: 0.01, ease: "easeOut" },
			x: { duration: 0.7, ease: "easeOut" },
		},
	},
};

export const fadeInFromRight: Variants = {
	hidden: { opacity: 0, x: 200 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			opacity: { duration: 0.01, ease: "easeOut" },
			x: { duration: 0.7, ease: "easeOut" },
		},
	},
};

export const fadeInFromTop: Variants = {
	hidden: { opacity: 0, y: -60 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			opacity: { duration: 0.4, ease: "easeOut" },
			y: { duration: 0.7, ease: "easeOut" },
		},
	},
};

export const fadeInFromBottom: Variants = {
	hidden: { opacity: 0, y: 60 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			opacity: { duration: 0.4, ease: "easeOut" },
			y: { duration: 0.7, ease: "easeOut" },
		},
	},
};

export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};
