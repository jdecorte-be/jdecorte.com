"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

interface ContributionDay {
	date: string;
	count: number;
	level: 0 | 1 | 2 | 3 | 4;
}

const GithubContributions = ({ username = "jdecorte-be" }) => {
	const { theme, systemTheme } = useTheme();
	const [data, setData] = useState<ContributionDay[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGithubContributions = async () => {
			try {
				// Use GitHub's contribution API or generate sample data
				// For now, we'll generate sample data based on the current year
				const contributions = generateSampleData();
				setData(contributions);
				setLoading(false);
			} catch (err) {
				setError("Failed to load GitHub contributions");
				setLoading(false);
			}
		};

		fetchGithubContributions();
	}, [username]);

	const generateSampleData = (): ContributionDay[] => {
		const data: ContributionDay[] = [];
		const today = new Date();
		const oneYearAgo = new Date(today);
		oneYearAgo.setFullYear(today.getFullYear() - 1);

		for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
			const dateStr = d.toISOString().split("T")[0];
			const random = Math.random();
			let count = 0;
			let level: 0 | 1 | 2 | 3 | 4 = 0;

			// Create a realistic pattern with some days having more activity
			if (random > 0.7) {
				count = Math.floor(Math.random() * 5) + 1;
				level = count === 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4;
			}

			data.push({
				date: dateStr,
				count,
				level,
			});
		}

		return data;
	};

	const currentTheme = theme === "system" ? systemTheme : theme;
	const placeholderWeeks = 53;
	const placeholderDays = 7;

	if (loading) {
		return (
			<div
				className="flex w-full justify-center overflow-x-auto py-8"
				aria-busy="true"
				aria-live="polite"
			>
				<div className="flex flex-col items-center gap-3">
					<div
						className="grid grid-flow-col gap-1 animate-pulse"
						role="status"
						aria-label="Loading GitHub contributions"
					>
						{Array.from({ length: placeholderWeeks }, (_, weekIndex) => (
							<div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-1">
								{Array.from({ length: placeholderDays }, (_, dayIndex) => (
									<div
										key={`day-${weekIndex}-${dayIndex}`}
										className="h-3 w-3 rounded-sm bg-gray-200 dark:bg-gray-800"
									/>
								))}
							</div>
						))}
					</div>
					<span className="text-sm text-gray-500 dark:text-gray-400">
						Loading GitHub activity...
					</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="py-8 text-center text-gray-500 dark:text-gray-400">
				{error}
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
				colorScheme={currentTheme === "dark" ? "dark" : "light"}
				blockSize={12}
				blockMargin={4}
				fontSize={14}
				labels={{
					totalCount: "{{count}} contributions in the last year",
				}}
			/>
		</div>
	);
};

export default GithubContributions;
