"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
	interface Window {
		umami?: {
			track: (
				payload?:
					| string
					| Record<string, unknown>
					| ((props: Record<string, unknown>) => Record<string, unknown>)
			) => void;
		};
	}
}

const UmamiPageview = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		window.umami?.track();
	}, [pathname, searchParams]);

	return null;
};

export default UmamiPageview;
