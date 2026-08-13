"use client";

import { type Action, KBarProvider, useKBar } from "kbar";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const KBarModal = dynamic(() => import("./KBarModal"), { ssr: false });

// ─── Provider ────────────────────────────────────────────────────────────────

interface SearchConfig {
	provider: "kbar";
	kbarConfig: {
		searchDocumentsPath: string;
	};
}

interface Props {
	searchConfig: SearchConfig;
	children: React.ReactNode;
}

function SearchLoader({
	searchDocumentsPath,
	children,
}: {
	searchDocumentsPath: string;
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [searchActions, setSearchActions] = useState<Action[]>([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [hasOpened, setHasOpened] = useState(false);

	// Only render the (heavy) modal and fetch the search index once the user
	// has actually opened the palette — most visitors never press Cmd+K.
	const { isOpening } = useKBar((state) => ({
		isOpening: state.visualState !== "hidden",
	}));

	useEffect(() => {
		if (isOpening) setHasOpened(true);
	}, [isOpening]);

	useEffect(() => {
		if (!hasOpened || dataLoaded) return;

		async function fetchData() {
			const url =
				searchDocumentsPath.indexOf("://") > 0 ||
				searchDocumentsPath.indexOf("//") === 0
					? searchDocumentsPath
					: new URL(searchDocumentsPath, window.location.origin).toString();

			const res = await fetch(url);
			const json = await res.json();

			const actions: Action[] = json.map(
				(post: {
					path: string;
					title: string;
					summary?: string;
					date?: string;
				}) => ({
					id: post.path,
					name: post.title,
					keywords: post.summary ?? "",
					section: "Content",
					subtitle: post.date
						? new Date(post.date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})
						: undefined,
					perform: () => router.push(`/${post.path}`),
				}),
			);

			setSearchActions(actions);
			setDataLoaded(true);
		}

		fetchData();
	}, [hasOpened, dataLoaded, router, searchDocumentsPath]);

	return (
		<>
			{hasOpened && (
				<KBarModal actions={searchActions} isLoading={!dataLoaded} />
			)}
			{children}
		</>
	);
}

export function CustomKBarSearchProvider({ searchConfig, children }: Props) {
	return (
		<KBarProvider
			options={{
				animations: { enterMs: 220, exitMs: 160 },
				disableScrollbarManagement: true,
			}}
		>
			<SearchLoader
				searchDocumentsPath={searchConfig.kbarConfig.searchDocumentsPath}
			>
				{children}
			</SearchLoader>
		</KBarProvider>
	);
}
