import { formValidation } from "../validation/formValidation"
import { sendMessage } from "../message/sendMessage"

/**
 * Validate the request, send the mailout, return the response
 * 
 * @param {Request} request
 */
export async function handlePOST(request: FetchEvent["request"]) {
	// console.log("headers", new Map(request.headers))
	// Grab the form contents
	const form = await request.json()

	// Validate
	const validationError = await formValidation(form, request.headers.get("CF-Connecting-IP"))
	if (validationError) {
		return validationError
	}

	// Send to Mailgun
	return sendMessage(form);
}