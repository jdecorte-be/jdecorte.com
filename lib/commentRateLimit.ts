import { createHash } from "node:crypto";
import { getCommentsCollection } from "./mongodb";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_COMMENTS_PER_WINDOW = 5;

export function getClientIp(request: Request): string {
	const forwardedFor = request.headers.get("x-forwarded-for");
	if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";
	return request.headers.get("x-real-ip") ?? "unknown";
}

// Store only a hash of the IP, never the raw address, and only for as long
// as it takes to enforce the rate-limit window.
export function hashIp(ip: string): string {
	return createHash("sha256").update(ip).digest("hex");
}

export async function isRateLimited(ipHash: string): Promise<boolean> {
	const since = new Date(Date.now() - WINDOW_MS);
	const count = await getCommentsCollection().countDocuments({
		ipHash,
		createdAt: { $gte: since },
	});
	return count >= MAX_COMMENTS_PER_WINDOW;
}
