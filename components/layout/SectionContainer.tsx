import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
	return (
		<section className="mx-auto flex w-full flex-1 flex-col max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
			{children}
		</section>
	);
}
