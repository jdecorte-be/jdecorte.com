import { NextResponse } from "next/server";
import { Resend } from "resend";
import siteMetadata from "@/data/siteMetadata.mjs";
import { umamiGet } from "@/lib/umami";

const DAY_MS = 86_400_000;

type StatsTotals = {
	pageviews: number;
	visitors: number;
	visits: number;
	bounces: number;
	totaltime: number;
};
type Stats = StatsTotals & { comparison: StatsTotals };
type MetricRow = { x: string; y: number };
type PageviewSeries = { pageviews: MetricRow[]; sessions: MetricRow[] };

type MetricSections = {
	topPages: MetricRow[];
	entryPages: MetricRow[];
	exitPages: MetricRow[];
	topReferrers: MetricRow[];
	events: MetricRow[];
	browsers: MetricRow[];
	os: MetricRow[];
	devices: MetricRow[];
	countries: MetricRow[];
};

const formatChange = (current: number, prev: number) => {
	if (prev === 0) return current > 0 ? "new" : "–";
	const pct = Math.round(((current - prev) / prev) * 100);
	return `${pct >= 0 ? "+" : ""}${pct}%`;
};

const formatDuration = (totalSeconds: number, visits: number) => {
	if (visits === 0) return "–";
	const avg = Math.round(totalSeconds / visits);
	const minutes = Math.floor(avg / 60);
	const seconds = avg % 60;
	return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
};

const formatBounceRate = (bounces: number, visits: number) =>
	visits === 0 ? "–" : `${Math.round((bounces / visits) * 100)}%`;

const titleCase = (value: string) =>
	value.replace(/\b\w/g, (c) => c.toUpperCase());

const escapeHtml = (value: string) =>
	value.replace(
		/[&<>"']/g,
		(char) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
				char
			] ?? char,
	);

const renderRows = (rows: MetricRow[]) =>
	rows.length === 0
		? '<tr><td style="padding:4px 0;color:#888;">No data</td></tr>'
		: rows
				.map(
					(row) =>
						`<tr><td style="padding:4px 8px 4px 0;">${escapeHtml(row.x || "(none)")}</td><td style="padding:4px 0;text-align:right;color:#555;">${row.y.toLocaleString()}</td></tr>`,
				)
				.join("");

const renderSection = (title: string, rows: MetricRow[]) => `
	<h3 style="margin-bottom:4px;margin-top:20px;">${title}</h3>
	<table style="width:100%;border-collapse:collapse;">${renderRows(rows)}</table>
`;

const renderTrend = (series: MetricRow[]) => {
	if (series.length === 0) {
		return '<tr><td style="padding:4px 0;color:#888;">No data</td></tr>';
	}
	const max = Math.max(...series.map((point) => point.y), 1);
	return series
		.map((point) => {
			const label = new Date(point.x).toLocaleDateString(siteMetadata.locale, {
				weekday: "short",
				day: "numeric",
			});
			const pct = Math.round((point.y / max) * 100);
			return `<tr>
				<td style="padding:3px 8px 3px 0;font-size:12px;color:#555;white-space:nowrap;">${label}</td>
				<td style="padding:3px 0;width:100%;"><div style="background:#111;height:8px;border-radius:4px;width:${pct}%;"></div></td>
				<td style="padding:3px 0 3px 8px;text-align:right;font-size:12px;color:#555;">${point.y.toLocaleString()}</td>
			</tr>`;
		})
		.join("");
};

const statCard = (label: string, value: string, change?: string) => `
	<td style="padding:8px;background:#f5f5f5;border-radius:6px;">
		<div style="font-size:12px;color:#888;">${label}</div>
		<div style="font-size:20px;font-weight:600;">${value}</div>
		${change ? `<div style="font-size:12px;color:#888;">${change} vs prior period</div>` : ""}
	</td>
`;

const buildSectionList = (
	sections: MetricSections,
): [string, MetricRow[]][] => [
	["Top pages", sections.topPages],
	["Entry pages", sections.entryPages],
	["Exit pages", sections.exitPages],
	["Top referrers", sections.topReferrers],
	["Top events", sections.events],
	["Browsers", sections.browsers],
	["Operating systems", sections.os],
	["Devices", sections.devices.map((row) => ({ ...row, x: titleCase(row.x) }))],
	["Countries", sections.countries],
];

const renderEmail = (
	stats: Stats,
	series: MetricRow[],
	sections: MetricSections,
	rangeLabel: string,
) => `
<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:0 auto;color:#111;">
	<h2 style="margin-bottom:4px;">${escapeHtml(siteMetadata.title)}</h2>
	<p style="margin-top:0;color:#666;">Stats for ${rangeLabel}</p>

	<table style="width:100%;border-collapse:collapse;margin:16px 0;">
		<tr>
			${statCard("Pageviews", stats.pageviews.toLocaleString(), formatChange(stats.pageviews, stats.comparison.pageviews))}
			<td style="width:8px;"></td>
			${statCard("Visitors", stats.visitors.toLocaleString(), formatChange(stats.visitors, stats.comparison.visitors))}
		</tr>
		<tr><td colspan="3" style="height:8px;"></td></tr>
		<tr>
			${statCard("Visits", stats.visits.toLocaleString(), formatChange(stats.visits, stats.comparison.visits))}
			<td style="width:8px;"></td>
			${statCard("Bounce rate", formatBounceRate(stats.bounces, stats.visits), formatChange(stats.bounces, stats.comparison.bounces))}
		</tr>
		<tr><td colspan="3" style="height:8px;"></td></tr>
		<tr>
			<td colspan="3" style="padding:8px;background:#f5f5f5;border-radius:6px;">
				<div style="font-size:12px;color:#888;">Avg. visit time</div>
				<div style="font-size:20px;font-weight:600;">${formatDuration(stats.totaltime, stats.visits)}</div>
			</td>
		</tr>
	</table>

	<h3 style="margin-bottom:4px;">Daily pageviews</h3>
	<table style="width:100%;border-collapse:collapse;">${renderTrend(series)}</table>

	${buildSectionList(sections)
		.map(([title, rows]) => renderSection(title, rows))
		.join("")}

	<p style="margin-top:24px;font-size:12px;color:#888;">
		<a href="${siteMetadata.siteUrl}" style="color:#888;">${siteMetadata.siteUrl.replace(/^https?:\/\//, "")}</a>
	</p>
</div>
`;

const renderTextRows = (rows: MetricRow[]) =>
	rows.length === 0
		? "  (no data)"
		: rows
				.map((row) => `  ${row.x || "(none)"} — ${row.y.toLocaleString()}`)
				.join("\n");

const renderTextTrend = (series: MetricRow[]) =>
	series.length === 0
		? "  (no data)"
		: series
				.map((point) => {
					const label = new Date(point.x).toLocaleDateString(
						siteMetadata.locale,
						{
							weekday: "short",
							day: "numeric",
						},
					);
					return `  ${label} — ${point.y.toLocaleString()}`;
				})
				.join("\n");

const renderEmailText = (
	stats: Stats,
	series: MetricRow[],
	sections: MetricSections,
	rangeLabel: string,
) => `${siteMetadata.title}
Stats for ${rangeLabel}

Pageviews: ${stats.pageviews.toLocaleString()} (${formatChange(stats.pageviews, stats.comparison.pageviews)} vs prior period)
Visitors: ${stats.visitors.toLocaleString()} (${formatChange(stats.visitors, stats.comparison.visitors)} vs prior period)
Visits: ${stats.visits.toLocaleString()} (${formatChange(stats.visits, stats.comparison.visits)} vs prior period)
Bounce rate: ${formatBounceRate(stats.bounces, stats.visits)}
Avg. visit time: ${formatDuration(stats.totaltime, stats.visits)}

Daily pageviews:
${renderTextTrend(series)}

${buildSectionList(sections)
	.map(([title, rows]) => `${title}:\n${renderTextRows(rows)}`)
	.join("\n\n")}

${siteMetadata.siteUrl}
`;

export async function GET(request: Request) {
	const secret = process.env.CRON_SECRET;
	const auth = request.headers.get("authorization");
	if (!secret || auth !== `Bearer ${secret}`) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const resendKey = process.env.RESEND_API_KEY;
	const from = process.env.STATS_EMAIL_FROM;
	const to = (process.env.STATS_EMAIL_TO ?? siteMetadata.email)
		.split(",")
		.map((address) => address.trim())
		.filter(Boolean);
	if (!resendKey || !from || to.length === 0) {
		return NextResponse.json(
			{ error: "Email is not configured" },
			{ status: 500 },
		);
	}

	const endAt = Date.now();
	const startAt = endAt - 7 * DAY_MS;
	const range = { startAt: String(startAt), endAt: String(endAt) };
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const metric = (type: string, limit = "5") =>
		umamiGet<MetricRow[]>("/metrics", { ...range, type, limit });

	const [
		stats,
		pageviewSeries,
		topPages,
		entryPages,
		exitPages,
		topReferrers,
		events,
		browsers,
		os,
		devices,
		countries,
	] = await Promise.all([
		umamiGet<Stats>("/stats", range),
		umamiGet<PageviewSeries>("/pageviews", { ...range, unit: "day", timezone }),
		metric("path"),
		metric("entry"),
		metric("exit"),
		metric("referrer"),
		metric("event"),
		metric("browser"),
		metric("os"),
		metric("device"),
		metric("country"),
	]);

	if (!stats) {
		return NextResponse.json(
			{ error: "Umami is not configured or unreachable" },
			{ status: 502 },
		);
	}

	const rangeLabel = `${new Date(startAt).toLocaleDateString(siteMetadata.locale)} – ${new Date(endAt).toLocaleDateString(siteMetadata.locale)}`;
	const sections: MetricSections = {
		topPages: topPages ?? [],
		entryPages: entryPages ?? [],
		exitPages: exitPages ?? [],
		topReferrers: topReferrers ?? [],
		events: events ?? [],
		browsers: browsers ?? [],
		os: os ?? [],
		devices: devices ?? [],
		countries: countries ?? [],
	};
	const series = pageviewSeries?.pageviews ?? [];

	const resend = new Resend(resendKey);
	const { error } = await resend.emails.send({
		from,
		to,
		subject: `Weekly stats: ${stats.pageviews.toLocaleString()} pageviews`,
		html: renderEmail(stats, series, sections, rangeLabel),
		text: renderEmailText(stats, series, sections, rangeLabel),
	});

	if (error) {
		console.error("Stats email failed to send:", error);
		return NextResponse.json({ error: error.message }, { status: 502 });
	}

	return NextResponse.json({ sent: true });
}
