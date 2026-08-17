"use client";

import { ActivityCalendar } from "react-activity-calendar";

export interface ContributionDay {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
}

const GithubContributions = ({ data }: { data: ContributionDay[] }) => {
	if (!data.length) {
		return (
			<div className="py-8 text-center text-gray-500 dark:text-gray-400">
				Failed to load GitHub contributions
			</div>
		);
	}

	return (
		<div className="flex w-full justify-center overflow-x-auto">
			<ActivityCalendar
				data={data}
				theme={{
					light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
					dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
				}}
				// The site forces dark mode (see app/theme-providers.tsx); resolving the
				// theme client-side here would cause an SSR hydration mismatch.
				colorScheme="dark"
				blockSize={12}
				blockMargin={4}
				fontSize={14}
				labels={{
					totalCount: "{{count}} contributions in 2025",
				}}
			/>
		</div>
	);
};

export default GithubContributions;
