import { corsHeaders } from './corsHeaders'

/**
 * Helper function to return JSON response
 * 
 * @param {string} message  Response message
 * @param {integer} status  HTTP response status
 */
export const JSONResponse = (message: string, status = 200) => {
	let headers = {
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
			...corsHeaders
		},

		status: status
	}

	return new Response(
		JSON.stringify({ message: message }),
		headers
	)
}