import { JSONResponse } from '../utilities/JSONResponse'

/**
 * Validates reCAPTCHA submission
 * @param {string} token
 * @param {string} ip
 * @returns {Response} on error else false
 */
export async function recaptchaValidation(token: string, ip: string) {
	try {
		let response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}&remoteip=${ip}`, {
			method: "POST",
		})
		let json = await response.json()

		if (json.success) {
			return false
		}

		console.log("Recaptcha error", json)
		return JSONResponse("reCAPTCHA failed", 400)
	} catch (err) {
		console.log("Fetch error", err)
		return JSONResponse("Oops! Something went wrong.", 400)
	}
}