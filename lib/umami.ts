const API_URL = (
	process.env.UMAMI_API_URL ?? "https://api.umami.is/v1"
).replace(/\/$/, "");

// Umami Cloud uses an API key header; self-hosted Umami uses a Bearer token.
const authHeaders = (token: string): Record<string, string> =>
	API_URL.includes("api.umami.is")
		? { "x-umami-api-key": token }
		: { Authorization: `Bearer ${token}` };

export const umamiConfigured = () =>
	Boolean(process.env.UMAMI_ID && process.env.UMAMI_API_TOKEN);

/**
 * Calls a Umami REST API endpoint scoped to this site's website ID.
 * Returns null if credentials are missing or the request fails.
 */
export async function umamiGet<T>(
	path: string,
	params: Record<string, string>,
	init?: RequestInit,
): Promise<T | null> {
	const websiteId = process.env.UMAMI_ID;
	const token = process.env.UMAMI_API_TOKEN;
	if (!websiteId || !token) {
		return null;
	}

	const url = `${API_URL}/websites/${websiteId}${path}?${new URLSearchParams(params)}`;

	try {
		const response = await fetch(url, {
			...init,
			headers: authHeaders(token),
		});
		if (!response.ok) {
			console.error(
				`Umami request failed: ${response.status} ${response.statusText} (${url})`,
			);
			return null;
		}
		return (await response.json()) as T;
	} catch (error) {
		console.error(`Umami request errored (${url}):`, error);
		return null;
	}
}
