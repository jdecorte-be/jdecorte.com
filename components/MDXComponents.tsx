import type { MDXComponents } from "mdx/types";
import TOCInline from "pliny/ui/TOCInline";
import Image from "./Image";
import CustomLink from "./Link";
import Pre from "./Pre";
import TableWrapper from "./TableWrapper";
// import Pre from "pliny/ui/Pre";

export const components: MDXComponents = {
	Image,
	TOCInline,
	a: CustomLink,
	pre: Pre,
	table: TableWrapper,
};
