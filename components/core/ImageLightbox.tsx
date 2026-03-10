"use client";

import {
	AnimatePresence,
	motion,
	useMotionValue,
	useTransform,
} from "motion/react";
import NextImage, { type ImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const ImageLightbox = (props: ImageProps) => {
	const [open, setOpen] = useState(false);
	const [zoomed, setZoomed] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const close = useCallback(() => {
		setZoomed(false);
		setOpen(false);
	}, []);

	const toggleZoom = useCallback(() => {
		setZoomed((z) => !z);
	}, []);

	// Lock body scroll when open
	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, close]);

	// Drag-to-dismiss
	const y = useMotionValue(0);
	const backdropOpacity = useTransform(y, [-300, 0, 300], [0.2, 1, 0.2]);

	return (
		<>
			<NextImage
				{...props}
				className={`${props.className ?? ""} cursor-zoom-in transition-transform duration-200 hover:brightness-110`}
				onClick={() => setOpen(true)}
			/>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						style={{ opacity: backdropOpacity }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
						onClick={close}
					>
						{/* Close button */}
						<motion.button
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ delay: 0.1, duration: 0.2 }}
							onClick={close}
							className="absolute right-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
							aria-label="Close lightbox"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<path d="M18 6 6 18M6 6l12 12" />
							</svg>
						</motion.button>

						{/* Image container — draggable to dismiss */}
						<motion.div
							ref={containerRef}
							initial={{ scale: 0.92, opacity: 0 }}
							animate={{ scale: 1.15, opacity: 1 }}
							exit={{ scale: 0.92, opacity: 0 }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
							drag="y"
							dragConstraints={{ top: 0, bottom: 0 }}
							dragElastic={0.8}
							style={{ y }}
							onDragEnd={(_, info) => {
								if (
									Math.abs(info.offset.y) > 100 ||
									Math.abs(info.velocity.y) > 500
								) {
									close();
								}
							}}
							className={`relative ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
							onClick={(e) => {
								e.stopPropagation();
								toggleZoom();
							}}
						>
							<motion.div
								animate={{ scale: zoomed ? 1.75 : 1 }}
								transition={{ type: "spring", damping: 20, stiffness: 200 }}
								className="overflow-hidden rounded-lg"
							>
								<NextImage
									{...props}
									className="h-auto max-h-[85vh] w-auto max-w-[90vw] select-none rounded-lg object-contain"
									width={typeof props.width === "number" ? props.width : 1200}
									height={typeof props.height === "number" ? props.height : 800}
									sizes="90vw"
									priority
									draggable={false}
								/>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ImageLightbox;
