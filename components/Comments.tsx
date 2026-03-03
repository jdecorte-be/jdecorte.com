"use client";

import { useTheme } from "next-themes";
import GiscusComponent from "@giscus/react";
import siteMetadata from "@/data/siteMetadata.mjs";

export default function Comments({ slug }: { slug: string }) {
	const { theme: nextTheme, resolvedTheme } = useTheme();


	const commentsConfig = siteMetadata.comments;

	if (!commentsConfig || commentsConfig.provider !== "giscus") return null;

	const giscusConfig = commentsConfig.giscusConfig;

	const commentsTheme =
		giscusConfig.themeURL === ""
			? nextTheme === "dark" || resolvedTheme === "dark"
				? giscusConfig.darkTheme
				: giscusConfig.theme
			: giscusConfig.themeURL;

	return (
		<GiscusComponent
			id="comments-container"
			repo={giscusConfig.repo as `${string}/${string}`}
			repoId={giscusConfig.repositoryId}
			category={giscusConfig.category}
			categoryId={giscusConfig.categoryId}
			mapping={giscusConfig.mapping}
			reactionsEnabled={giscusConfig.reactions}
			emitMetadata={giscusConfig.metadata}
			inputPosition={giscusConfig.inputPosition}
			theme={commentsTheme}
			lang={giscusConfig.lang}
			loading="eager"
		/>
	);
}
