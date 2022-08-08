import { JSONResponse } from "./utilities/JSONResponse"
import { handleCORS } from "./handlers/handleCors"
import { handlePOST } from "./handlers/handlePOST"

addEventListener('fetch', (event: FetchEvent) => {
	event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * 
 * @param {Request} request
 */
export async function handleRequest(request: FetchEvent["request"]) {
	// CORS pre-flight request
	if (request.method === 'OPTIONS') {
		return await handleCORS(request)
	}
	// The contact form POST request
	else if (request.method === 'POST') {
		return await handlePOST(request)
	}

	return JSONResponse("Expected POST", 500)
}