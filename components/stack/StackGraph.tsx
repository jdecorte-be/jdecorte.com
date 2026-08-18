"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
	type StackCategory,
	type StackItem,
	stackCategories,
} from "@/data/stackData";

const CENTER = 50;
const CATEGORY_RADIUS = 27;
const ITEM_RADIUS = 47;

function polar(radius: number, angleDeg: number) {
	const rad = ((angleDeg - 90) * Math.PI) / 180;
	return {
		x: CENTER + radius * Math.cos(rad),
		y: CENTER + radius * Math.sin(rad),
	};
}

interface PositionedItem extends StackItem {
	x: number;
	y: number;
}

interface PositionedCategory extends StackCategory {
	x: number;
	y: number;
	items: PositionedItem[];
}

const layout: PositionedCategory[] = stackCategories.map((category, i) => {
	const angle = (360 / stackCategories.length) * i;
	const { x, y } = polar(CATEGORY_RADIUS, angle);
	const spread =
		category.items.length > 1 ? 15 * (category.items.length - 1) : 0;
	const items = category.items.map((item, j) => {
		const itemAngle =
			category.items.length === 1
				? angle
				: angle - spread / 2 + (spread / (category.items.length - 1)) * j;
		const p = polar(ITEM_RADIUS, itemAngle);
		return { ...item, x: p.x, y: p.y };
	});
	return { ...category, x, y, items };
});

const totalItems = layout.reduce((sum, c) => sum + c.items.length, 0);

type ActiveNode =
	| { kind: "root" }
	| { kind: "category"; category: PositionedCategory }
	| { kind: "item"; category: PositionedCategory; item: PositionedItem };

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
};

const nodeVariants = {
	hidden: { opacity: 0, scale: 0.4 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { type: "spring" as const, damping: 16, stiffness: 260 },
	},
};

export default function StackGraph() {
	const [active, setActive] = useState<ActiveNode | null>(null);

	const activeCategoryId =
		active?.kind === "category"
			? active.category.id
			: active?.kind === "item"
				? active.category.id
				: null;
	const activeItemId = active?.kind === "item" ? active.item.id : null;

	const panel = useMemo(() => {
		if (!active || active.kind === "root") {
			return {
				key: "root",
				color: "#9ca3af",
				title: "jdecorte.com",
				subtitle: null as string | null,
				description: `${totalItems} tools across ${layout.length} categories. Hover or tap a node to see what it does.`,
			};
		}
		if (active.kind === "category") {
			return {
				key: active.category.id,
				color: active.category.color,
				title: active.category.name,
				subtitle: `${active.category.items.length} tools`,
				description: active.category.description,
			};
		}
		return {
			key: active.item.id,
			color: active.category.color,
			title: active.item.name,
			subtitle: active.category.name,
			description: active.item.description,
		};
	}, [active]);

	const PanelIcon =
		!active || active.kind === "root"
			? null
			: active.kind === "category"
				? active.category.icon
				: active.item.icon;

	return (
		<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				onMouseLeave={() => setActive(null)}
				className="relative mx-auto aspect-square w-full max-w-[560px] shrink-0 select-none sm:max-w-[640px]"
			>
				<svg
					viewBox="0 0 100 100"
					className="absolute inset-0 h-full w-full overflow-visible"
					aria-hidden="true"
				>
					<title>Tech stack graph connections</title>
					{layout.map((category) => {
						const catActive = activeCategoryId === category.id;
						const dimmed = activeCategoryId !== null && !catActive;
						return (
							<motion.line
								key={`root-${category.id}`}
								x1={CENTER}
								y1={CENTER}
								x2={category.x}
								y2={category.y}
								stroke={category.color}
								strokeWidth={1.8}
								strokeLinecap="round"
								vectorEffect="non-scaling-stroke"
								initial={{ pathLength: 0, opacity: 0 }}
								animate={{
									pathLength: 1,
									opacity: catActive ? 0.9 : dimmed ? 0.12 : 0.4,
								}}
								transition={{
									pathLength: { duration: 0.4 },
									opacity: { duration: 0.25 },
								}}
							/>
						);
					})}
					{layout.map((category) =>
						category.items.map((item) => {
							const itemActive = activeItemId === item.id;
							const catActive = activeCategoryId === category.id;
							const dimmed = activeCategoryId !== null && !catActive;
							return (
								<motion.line
									key={`${category.id}-${item.id}`}
									x1={category.x}
									y1={category.y}
									x2={item.x}
									y2={item.y}
									stroke={category.color}
									strokeWidth={1.3}
									strokeLinecap="round"
									vectorEffect="non-scaling-stroke"
									initial={{ pathLength: 0, opacity: 0 }}
									animate={{
										pathLength: 1,
										opacity: itemActive
											? 1
											: catActive
												? 0.55
												: dimmed
													? 0.06
													: 0.22,
									}}
									transition={{
										pathLength: { duration: 0.4 },
										opacity: { duration: 0.25 },
									}}
								/>
							);
						}),
					)}
				</svg>

				<motion.button
					type="button"
					variants={nodeVariants}
					onMouseEnter={() => setActive({ kind: "root" })}
					onFocus={() => setActive({ kind: "root" })}
					onClick={() => setActive({ kind: "root" })}
					aria-label="jdecorte.com"
					className="absolute z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-gray-900 text-xs font-semibold tracking-wide text-gray-200 shadow-[0_0_0_4px_rgba(255,255,255,0.03)] sm:h-20 sm:w-20 sm:text-sm"
					style={{ left: `${CENTER}%`, top: `${CENTER}%` }}
				>
					JD
				</motion.button>

				{layout.map((category) => {
					const CategoryIcon = category.icon;
					const catActive = activeCategoryId === category.id;
					const dimmed = activeCategoryId !== null && !catActive;
					return (
						<motion.div key={category.id}>
							<motion.button
								type="button"
								variants={nodeVariants}
								onMouseEnter={() => setActive({ kind: "category", category })}
								onFocus={() => setActive({ kind: "category", category })}
								onClick={() => setActive({ kind: "category", category })}
								aria-label={category.name}
								style={{
									left: `${category.x}%`,
									top: `${category.y}%`,
									borderColor: `${category.color}80`,
									color: category.color,
									opacity: dimmed ? 0.35 : 1,
								}}
								className="absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-gray-950/90 backdrop-blur-sm transition-opacity sm:h-14 sm:w-14"
							>
								<CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5" />
							</motion.button>
							<motion.span
								variants={nodeVariants}
								style={{
									left: `${category.x}%`,
									top: `${category.y}%`,
									opacity: dimmed ? 0.35 : 1,
								}}
								className="pointer-events-none absolute z-10 -translate-x-1/2 translate-y-[22px] whitespace-nowrap text-xs font-medium text-gray-200 sm:translate-y-[28px] sm:text-sm"
							>
								{category.name}
							</motion.span>

							{category.items.map((item) => {
								const ItemIcon = item.icon;
								const itemActive = activeItemId === item.id;
								const itemDimmed =
									(activeCategoryId !== null && !catActive) ||
									(activeItemId !== null && !itemActive);
								return (
									<motion.div key={item.id}>
										<motion.button
											type="button"
											variants={nodeVariants}
											onMouseEnter={() =>
												setActive({ kind: "item", category, item })
											}
											onFocus={() =>
												setActive({ kind: "item", category, item })
											}
											onClick={() =>
												setActive({ kind: "item", category, item })
											}
											aria-label={item.name}
											style={{
												left: `${item.x}%`,
												top: `${item.y}%`,
												borderColor: itemActive
													? category.color
													: "rgba(255,255,255,0.12)",
												opacity: itemDimmed ? 0.4 : 1,
											}}
											className="absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-gray-950/80 text-gray-300 backdrop-blur-sm transition-opacity hover:text-white sm:h-11 sm:w-11"
										>
											<ItemIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
										</motion.button>
										<motion.span
											variants={nodeVariants}
											style={{
												left: `${item.x}%`,
												top: `${item.y}%`,
												opacity: itemDimmed ? 0.4 : 1,
											}}
											className="pointer-events-none absolute z-10 -translate-x-1/2 translate-y-[18px] whitespace-nowrap text-[10px] text-gray-500 sm:translate-y-[22px] sm:text-xs"
										>
											{item.name}
										</motion.span>
									</motion.div>
								);
							})}
						</motion.div>
					);
				})}
			</motion.div>

			<div className="min-h-[140px] flex-1 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 sm:min-h-[160px] sm:p-6">
				<AnimatePresence mode="wait">
					<motion.div
						key={panel.key}
						initial={{ opacity: 0, y: 4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.15 }}
						className="flex items-start gap-4"
					>
						{PanelIcon && (
							<span
								className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border sm:h-12 sm:w-12"
								style={{ borderColor: `${panel.color}80`, color: panel.color }}
							>
								<PanelIcon className="h-5 w-5 sm:h-6 sm:w-6" />
							</span>
						)}
						<div className="min-w-0">
							<div className="flex flex-wrap items-baseline gap-x-2">
								<h3 className="text-base font-semibold text-gray-100 sm:text-lg">
									{panel.title}
								</h3>
								{panel.subtitle && (
									<span className="text-xs text-gray-500 sm:text-sm">
										{panel.subtitle}
									</span>
								)}
							</div>
							<p className="mt-1.5 text-sm leading-relaxed text-gray-400 sm:text-base">
								{panel.description}
							</p>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
