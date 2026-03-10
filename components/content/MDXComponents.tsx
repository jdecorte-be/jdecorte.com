import type { MDXComponents } from "mdx/types";
import TOCInline from "pliny/ui/TOCInline";
import Image from "@/components/core/Image";
import ImageLightbox from "@/components/core/ImageLightbox";
import CustomLink from "@/components/core/Link";
import GithubCard from "@/components/social/GithubCard";
import Callout from "./Callout";
import Pre from "./Pre";
import TableWrapper from "./TableWrapper";
// import Pre from "pliny/ui/Pre";

export const components: MDXComponents = {
	Image: ImageLightbox,
	TOCInline,
	Callout,
	GithubCard,
	a: CustomLink,
	pre: Pre,
	table: TableWrapper,
};
