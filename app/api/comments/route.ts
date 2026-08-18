import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { MAX_AUTHOR_LENGTH, MAX_BODY_LENGTH } from "@/lib/commentLimits";
import { getClientIp, hashIp, isRateLimited } from "@/lib/commentRateLimit";
import { getCommentsCollection } from "@/lib/mongodb";

const SLUG_PATTERN = /^[a-zA-Z0-9/_-]{1,200}$/;

export async function GET(request: Request) {
	const slug = new URL(request.url).searchParams.get("slug") ?? "";
	if (!SLUG_PATTERN.test(slug)) {
		return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
	}

	try {
		const comments = await getCommentsCollection()
			.find({ slug }, { projection: { slug: 0, ipHash: 0 } })
			.sort({ createdAt: 1 })
			.limit(500)
			.toArray();

		return NextResponse.json({
			comments: comments.map((c) => ({
				id: c._id.toString(),
				author: c.author,
				body: c.body,
				createdAt: c.createdAt,
				parentId: c.parentId ? c.parentId.toString() : null,
			})),
		});
	} catch {
		return NextResponse.json(
			{ error: "Failed to load comments" },
			{ status: 500 },
		);
	}
}

export async function POST(request: Request) {
	let payload: {
		slug?: unknown;
		author?: unknown;
		body?: unknown;
		parentId?: unknown;
		website?: unknown;
	};
	try {
		payload = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	// Honeypot: real users never fill this hidden field, bots often do.
	const website =
		typeof payload.website === "string" ? payload.website.trim() : "";
	if (website) {
		return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
	}

	const slug = typeof payload.slug === "string" ? payload.slug : "";
	const author =
		typeof payload.author === "string" ? payload.author.trim() : "";
	const body = typeof payload.body === "string" ? payload.body.trim() : "";
	const parentIdRaw =
		typeof payload.parentId === "string" ? payload.parentId : null;

	if (!SLUG_PATTERN.test(slug)) {
		return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
	}
	if (!author || author.length > MAX_AUTHOR_LENGTH) {
		return NextResponse.json(
			{ error: `Name is required (max ${MAX_AUTHOR_LENGTH} characters)` },
			{ status: 400 },
		);
	}
	if (!body || body.length > MAX_BODY_LENGTH) {
		return NextResponse.json(
			{ error: `Comment is required (max ${MAX_BODY_LENGTH} characters)` },
			{ status: 400 },
		);
	}
	if (parentIdRaw !== null && !ObjectId.isValid(parentIdRaw)) {
		return NextResponse.json(
			{ error: "Invalid parent comment" },
			{ status: 400 },
		);
	}

	try {
		const collection = getCommentsCollection();

		const ipHash = hashIp(getClientIp(request));
		if (await isRateLimited(ipHash)) {
			return NextResponse.json(
				{
					error: "You're commenting too fast. Please wait a bit and try again.",
				},
				{ status: 429 },
			);
		}

		let parentId: ObjectId | null = null;
		if (parentIdRaw !== null) {
			const parent = await collection.findOne({
				_id: new ObjectId(parentIdRaw),
				slug,
			});
			if (!parent) {
				return NextResponse.json(
					{ error: "Invalid parent comment" },
					{ status: 400 },
				);
			}
			parentId = parent._id;
		}

		const createdAt = new Date();
		const { insertedId } = await collection.insertOne({
			slug,
			author,
			body,
			parentId,
			ipHash,
			createdAt,
		});

		return NextResponse.json(
			{
				comment: {
					id: insertedId.toString(),
					author,
					body,
					createdAt,
					parentId: parentId ? parentId.toString() : null,
				},
			},
			{ status: 201 },
		);
	} catch {
		return NextResponse.json(
			{ error: "Failed to save comment" },
			{ status: 500 },
		);
	}
}
