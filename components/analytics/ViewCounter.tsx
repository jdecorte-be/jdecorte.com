"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface ViewCounterProps {
	/** URL path of the page without leading slash, e.g. "writeups/my-post" */
	path: string;
}

export default function ViewCounter({ path }: Readonly<ViewCounterProps>) {
	const [views, setViews] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		const fetchViews = async () => {
			try {
				const response = await fetch(
					`/api/views?path=${encodeURIComponent(path)}`,
					{ signal: controller.signal },
				);
				if (response.ok) {
					const data = await response.json();
					setViews(typeof data.views === "number" ? data.views : null);
				}
			} catch {
				// Leave views as null; the counter simply won't render.
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		};

		fetchViews();
		return () => controller.abort();
	}, [path]);

	if (loading) {
		return (
			<span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
				<Eye className="h-4 w-4" />
				<span>•••</span>
			</span>
		);
	}

	if (views === null) {
		return null;
	}

	return (
		<span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
			<Eye className="h-4 w-4" />
			<span>
				{views.toLocaleString()} {views === 1 ? "view" : "views"}
			</span>
		</span>
	);
}
