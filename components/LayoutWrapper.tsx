import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SectionContainer from "./SectionContainer";

interface Props {
	children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
	return (
		<div className="flex h-screen flex-col justify-between font-sans">
			<Header />
			<SectionContainer>
				<main className="mb-auto">{children}</main>
				<Footer />
			</SectionContainer>
		</div>
	);
};

export default LayoutWrapper;
