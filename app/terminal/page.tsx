import { genPageMetadata } from "app/seo";
import Terminal from "@/components/terminal/Terminal";

export const metadata = genPageMetadata({
	title: "Terminal",
	description:
		"An interactive terminal to explore John Decorte's portfolio, projects, and writeups from the command line.",
});

export default function TerminalPage() {
	return <Terminal />;
}
