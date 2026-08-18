import { NextResponse } from "next/server";
import { Resend } from "resend";
import siteMetadata from "@/data/siteMetadata.mjs";
import { umamiGet } from "@/lib/umami";

const DAY_MS = 86_400_000;

type StatsMetric = { value: number; prev: number };
type Stats = {
	pageviews: StatsMetric;
	visitors: StatsMetric;
	visits: StatsMetric;
	bounces: StatsMetric;
	totaltime: StatsMetric;
};
type MetricRow = { x: string; y: number };

const formatChange = (current: number, prev: number) => {
	if (prev === 0) return current > 0 ? "new" : "–";
	const pct = Math.round(((current - prev) / prev) * 100);
	return `${pct >= 0 ? "+" : ""}${pct}%`;
};

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

const renderEmail = (
	stats: Stats,
	topPages: MetricRow[],
	topReferrers: MetricRow[],
	rangeLabel: string,
) => `
<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:0 auto;color:#111;">
	<h2 style="margin-bottom:4px;">${escapeHtml(siteMetadata.title)}</h2>
	<p style="margin-top:0;color:#666;">Stats for ${rangeLabel}</p>

	<table style="width:100%;border-collapse:collapse;margin:16px 0;">
		<tr>
			<td style="padding:8px;background:#f5f5f5;border-radius:6px;">
				<div style="font-size:12px;color:#888;">Pageviews</div>
				<div style="font-size:20px;font-weight:600;">${stats.pageviews.value.toLocaleString()}</div>
				<div style="font-size:12px;color:#888;">${formatChange(stats.pageviews.value, stats.pageviews.prev)} vs prior period</div>
			</td>
			<td style="width:8px;"></td>
			<td style="padding:8px;background:#f5f5f5;border-radius:6px;">
				<div style="font-size:12px;color:#888;">Visitors</div>
				<div style="font-size:20px;font-weight:600;">${stats.visitors.value.toLocaleString()}</div>
				<div style="font-size:12px;color:#888;">${formatChange(stats.visitors.value, stats.visitors.prev)} vs prior period</div>
			</td>
		</tr>
	</table>

	<h3 style="margin-bottom:4px;">Top pages</h3>
	<table style="width:100%;border-collapse:collapse;">${renderRows(topPages)}</table>

	<h3 style="margin-bottom:4px;margin-top:20px;">Top referrers</h3>
	<table style="width:100%;border-collapse:collapse;">${renderRows(topReferrers)}</table>
</div>
`;

export async function GET(request: Request) {
	const secret = process.env.CRON_SECRET;
	const auth = request.headers.get("authorization");
	if (!secret || auth !== `Bearer ${secret}`) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const resendKey = process.env.RESEND_API_KEY;
	const from = process.env.STATS_EMAIL_FROM;
	const to = process.env.STATS_EMAIL_TO ?? siteMetadata.email;
	if (!resendKey || !from) {
		return NextResponse.json(
			{ error: "Email is not configured" },
			{ status: 500 },
		);
	}

	const endAt = Date.now();
	const startAt = endAt - 7 * DAY_MS;
	const range = { startAt: String(startAt), endAt: String(endAt) };

	const [stats, topPages, topReferrers] = await Promise.all([
		umamiGet<Stats>("/stats", range),
		umamiGet<MetricRow[]>("/metrics", { ...range, type: "url", limit: "5" }),
		umamiGet<MetricRow[]>("/metrics", {
			...range,
			type: "referrer",
			limit: "5",
		}),
	]);

	if (!stats) {
		return NextResponse.json(
			{ error: "Umami is not configured or unreachable" },
			{ status: 502 },
		);
	}

	const rangeLabel = `${new Date(startAt).toLocaleDateString(siteMetadata.locale)} – ${new Date(endAt).toLocaleDateString(siteMetadata.locale)}`;

	const resend = new Resend(resendKey);
	const { error } = await resend.emails.send({
		from,
		to,
		subject: `Weekly stats: ${stats.pageviews.value.toLocaleString()} pageviews`,
		html: renderEmail(stats, topPages ?? [], topReferrers ?? [], rangeLabel),
	});

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 502 });
	}

	return NextResponse.json({ sent: true });
}
