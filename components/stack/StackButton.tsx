"use client";

import { Network, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import StackGraph from "@/components/stack/StackGraph";

export default function StackButton() {
	const [open, setOpen] = useState(false);

	const close = useCallback(() => setOpen(false), []);

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

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				aria-label="View the site's tech stack as a graph"
				className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-gray-950/60 text-gray-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all hover:scale-105 hover:border-white/20 hover:text-white active:scale-95"
			>
				<Network className="h-5 w-5" />
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
						onClick={close}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.96, y: 8 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.96, y: 8 }}
							transition={{ type: "spring", damping: 26, stiffness: 320 }}
							onClick={(e) => e.stopPropagation()}
							className="max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-white/[0.07] bg-gray-950/90 p-7 shadow-[0_8px_60px_0_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-2xl sm:p-10"
						>
							<div className="mb-6 flex items-center justify-between">
								<div>
									<h2 className="text-xl font-semibold text-gray-100 sm:text-2xl">
										Tech Stack
									</h2>
									<p className="text-sm text-gray-500">
										What jdecorte.com is built with.
									</p>
								</div>
								<button
									type="button"
									onClick={close}
									aria-label="Close"
									className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
								>
									<X className="h-5 w-5" />
								</button>
							</div>

							<StackGraph />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
