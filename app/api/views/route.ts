import { NextResponse } from "next/server";
import { umamiConfigured, umamiGet } from "@/lib/umami";

const PATH_PATTERN = /^[a-zA-Z0-9/_-]{1,200}$/;

export async function GET(request: Request) {
	const path = new URL(request.url).searchParams.get("path") ?? "";
	if (!PATH_PATTERN.test(path)) {
		return NextResponse.json({ error: "Invalid path" }, { status: 400 });
	}

	if (!umamiConfigured()) {
		return NextResponse.json({ views: null });
	}

	// Round endAt up to the next hour so the fetch cache key stays stable
	// long enough for `revalidate` to matter.
	const endAt = Math.ceil(Date.now() / 3_600_000) * 3_600_000;
	const url = `/${path.replace(/^\/+/, "")}`;

	const stats = await umamiGet<{ pageviews?: number }>(
		"/stats",
		{ startAt: "0", endAt: String(endAt), url },
		{ next: { revalidate: 300 } },
	);
	if (!stats) {
		return NextResponse.json({ views: null }, { status: 502 });
	}

	return NextResponse.json(
		{ views: stats.pageviews ?? 0 },
		{
			headers: {
				"Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
			},
		},
	);
}
