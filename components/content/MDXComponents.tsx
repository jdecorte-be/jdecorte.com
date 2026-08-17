import type { MDXComponents } from "mdx/types";
import TOCInline from "pliny/ui/TOCInline.js";
import Image from "@/components/core/Image";
import ImageLightbox from "@/components/core/ImageLightbox";
import CustomLink from "@/components/core/Link";
import GithubCard from "@/components/social/GithubCard";
import Callout from "./Callout";
import MDXImg from "./MDXImg";
import Pre from "./Pre";
import TableWrapper from "./TableWrapper";
// import Pre from "pliny/ui/Pre.js";

export const components: MDXComponents = {
	Image: ImageLightbox,
	img: MDXImg,
	TOCInline,
	Callout,
	GithubCard,
	a: CustomLink,
	pre: Pre,
	table: TableWrapper,
};
