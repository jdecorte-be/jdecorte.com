"use client";

import dynamic from "next/dynamic";

const PortfolioSection = dynamic(() => import("./PortfolioSection"), {
	ssr: false,
});

export default function PortfolioSectionClient() {
	return <PortfolioSection />;
}
