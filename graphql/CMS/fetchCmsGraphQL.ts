// Imports
import { rewriteCmsUrlsDeep } from "@/config/cmsMediaUrl";
import { IGraphQLResponse } from "@/graphql/CMS/types/graphqlResponse";

// Environment Variables
const GRAPHQL_ENDPOINT: string | undefined = process.env.CMS_API_URL;
if (!GRAPHQL_ENDPOINT) throw new Error("CMS_API_URL not defined.");

/**
 * Posts a GraphQL query to the WPGraphQL endpoint using Next.js's native
 * `fetch` cache (`next: { revalidate }`) and returns the typed `data` payload.
 *
 * Replaces `config/apollo.ts` / `@apollo/client` entirely — there is no
 * client-side GraphQL cache any more, only Next's Data Cache. Every query in
 * `graphql/CMS/*.ts` used to carry an identical `client.query()` call; they
 * now all share this one fetcher.
 *
 * Returns `null` on an HTTP-level failure or GraphQL validation errors so the
 * caller can decide whether that's fatal; a thrown network error propagates
 * to the caller's own try/catch.
 *
 * Every CMS-origin URL anywhere in the response — a `sourceUrl`, a
 * `mediaItemUrl`, a document linked from a WYSIWYG field — is rewritten to
 * the `/api/media` proxy (`config/cmsMediaUrl.ts`) before it reaches the
 * caller, so every one of this function's callers gets data that's already
 * safe to render without having to remember to call the rewrite themselves.
 *
 * @param query Raw GraphQL query string.
 * @param variables Optional GraphQL variables — prefer a `$var` over
 *   string-interpolating input into `query`.
 * @param revalidate Seconds to cache the response for (default 24h).
 */
export const fetchCmsGraphQL = async <T>(
	query: string,
	variables?: Record<string, unknown>,
	revalidate: number = 86400
): Promise<T | null> => {
	const response: Response = await fetch(GRAPHQL_ENDPOINT!, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(variables ? { query, variables } : { query }),
		next: { revalidate },
	});

	if (!response.ok) {
		console.error(`CMS GraphQL fetch failed with status: ${response.status}`);
		return null;
	}

	const json: IGraphQLResponse<T> = await response.json();

	if (json.errors) {
		console.error("CMS GraphQL query returned errors:", json.errors);
		return null;
	}

	return json.data ? rewriteCmsUrlsDeep(json.data) : null;
};
