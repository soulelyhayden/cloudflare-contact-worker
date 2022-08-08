import { corsHeaders } from "../utilities/corsHeaders"

/**
 * Respond to the pre-flight CORS request
 * 
 * @param {Request} request
 */
export async function handleCORS(request: FetchEvent["request"]) {
	if (
		request.headers.get("Origin") !== null &&
		request.headers.get("Access-Control-Request-Method") !== null &&
		request.headers.get("Access-Control-Request-Headers") !== null
	) {
		// Handle CORS pre-flight request.
		return new Response(null, {
			headers: corsHeaders
		})
	} else {
		// Handle standard OPTIONS request.
		return new Response(null, {
			headers: {
				"Allow": "GET, HEAD, POST, OPTIONS"
			}
		})
	}
}