import type { MDXComponents } from "mdx/types";
import TOCInline from "pliny/ui/TOCInline";
import Callout from "./Callout";
import GithubCard from "./GithubCard";
import Image from "./Image";
import ImageLightbox from "./ImageLightbox";
import CustomLink from "./Link";
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
