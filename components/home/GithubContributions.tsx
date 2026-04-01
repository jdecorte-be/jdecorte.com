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
				// Fetch real GitHub contributions from public API for 2025
				const response = await fetch(
					`https://github-contributions-api.jogruber.de/v4/${username}?y=2025`
				);

				if (!response.ok) {
					throw new Error("Failed to fetch contributions");
				}

				const result = await response.json();

				// Transform the API response to match our ContributionDay interface
				const contributions: ContributionDay[] =
					result.contributions.map((contribution: any) => ({
						date: contribution.date,
						count: contribution.count,
						level: contribution.level as 0 | 1 | 2 | 3 | 4,
					})) || [];

				setData(contributions);
				setLoading(false);
			} catch (err) {
				console.error("Error fetching GitHub contributions:", err);
				setError("Failed to load GitHub contributions");
				setLoading(false);
			}
		};

		fetchGithubContributions();
	}, [username]);

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
					totalCount: "{{count}} contributions in 2025",
				}}
			/>
		</div>
	);
};

export default GithubContributions;
