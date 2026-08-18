"use client";

import {
	type Action,
	KBarAnimator,
	KBarPortal,
	KBarPositioner,
	KBarResults,
	KBarSearch,
	useKBar,
	useMatches,
	useRegisterActions,
} from "kbar";

function RenderResults() {
	const { results } = useMatches();

	if (!results.length) {
		return (
			<div className="px-4 py-10 text-center text-sm text-gray-600">
				No results for your search…
			</div>
		);
	}

	return (
		<KBarResults
			items={results}
			onRender={({ item, active }) =>
				typeof item === "string" ? (
					<div className="px-4 pb-1.5 pt-4 text-[10px] font-semibold uppercase tracking-widest text-primary-500/70">
						{item}
					</div>
				) : (
					<div
						className={`mx-2 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition-all ${
							active
								? "bg-primary-500/10 text-gray-100 shadow-[inset_0_0_0_1px_rgba(239,71,121,0.25)]"
								: "text-gray-400 hover:bg-primary-500/5"
						}`}
					>
						<div className="flex min-w-0 items-center gap-3">
							{item.icon && (
								<span
									className={`shrink-0 ${active ? "text-primary-400" : "text-gray-500"}`}
								>
									{item.icon}
								</span>
							)}
							<div className="min-w-0">
								{item.subtitle && (
									<p
										className={`truncate text-[11px] ${active ? "text-gray-400" : "text-gray-600"}`}
									>
										{item.subtitle}
									</p>
								)}
								<p className="truncate text-sm">{item.name}</p>
							</div>
						</div>
						{item.shortcut?.length ? (
							<div className="flex shrink-0 gap-1">
								{item.shortcut.map((sc) => (
									<kbd
										key={sc}
										className={`flex h-5 min-w-[1.25rem] items-center justify-center rounded-md border px-1 text-[10px] font-medium ${
											active
												? "border-primary-500/30 bg-primary-500/10 text-primary-200"
												: "border-white/10 bg-white/5 text-gray-500"
										}`}
									>
										{sc}
									</kbd>
								))}
							</div>
						) : null}
					</div>
				)
			}
		/>
	);
}

export default function KBarModal({
	actions,
	isLoading,
}: {
	actions: Action[];
	isLoading: boolean;
}) {
	const { visualState } = useKBar((state) => ({
		visualState: state.visualState,
	}));

	useRegisterActions(actions, [actions]);

	return (
		<KBarPortal>
			<KBarPositioner
				className="kbar-overlay z-50 flex items-start justify-center bg-black/60 p-4 pt-[15vh] backdrop-blur-md"
				data-kbar-state={visualState}
			>
				<KBarAnimator className="kbar-animator w-[clamp(min(92vw,24rem),60vw,48rem)]">
					<div className="kbar-surface overflow-hidden rounded-2xl border border-primary-500/[0.15] bg-gray-950/40 shadow-[0_8px_60px_0_rgba(0,0,0,0.7),0_0_0_1px_rgba(239,71,121,0.06)] backdrop-blur-2xl">
						{/* Search input row */}
						<div className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
							<svg
								className="h-4 w-4 shrink-0 text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							<KBarSearch
								className="h-8 w-full bg-transparent text-sm text-gray-100 caret-primary-400 placeholder-gray-500 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 sm:h-9 sm:text-base"
								defaultPlaceholder="Search writeups, pages…"
							/>
							<kbd className="inline-flex shrink-0 items-center rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
								ESC
							</kbd>
						</div>

						{/* Divider */}
						<div className="h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

						{/* Results */}
						<div className="max-h-[60vh] overflow-y-auto py-1.5 scrollbar-thin">
							{isLoading ? (
								<div className="px-4 py-8 text-center text-sm text-gray-600">
									Loading…
								</div>
							) : (
								<RenderResults />
							)}
						</div>

						{/* Footer hint */}
						<div className="flex items-center gap-4 border-t border-white/[0.05] px-4 py-2.5 text-[10px] text-gray-600">
							<span className="flex items-center gap-1.5">
								<kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-sans">
									↑
								</kbd>
								<kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-sans">
									↓
								</kbd>
								<span>navigate</span>
							</span>
							<span className="flex items-center gap-1.5">
								<kbd className="rounded-md border border-primary-500/30 bg-primary-500/10 px-1.5 py-0.5 font-sans text-primary-300">
									↵
								</kbd>
								<span>open</span>
							</span>
							<span className="flex items-center gap-1.5 ml-auto">
								<kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-sans">
									esc
								</kbd>
								<span>close</span>
							</span>
						</div>
					</div>
				</KBarAnimator>
			</KBarPositioner>
		</KBarPortal>
	);
}
