import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SectionContainer from "./SectionContainer";

interface Props {
	children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
	return (
		<div className="flex flex-col font-sans">
			<Header />
			<SectionContainer>
				<main>{children}</main>
				<Footer />
			</SectionContainer>
		</div>
	);
};

export default LayoutWrapper;
