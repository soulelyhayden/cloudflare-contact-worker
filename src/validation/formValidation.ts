import { JSONResponse } from '../utilities/JSONResponse'
import { recaptchaValidation } from './recaptchaValidation'
import { capitalize } from '../utilities/capitalize'

/**
 * Validates the submitted form
 * @param {JSON} form 
 * @param {string} ip
 * @returns {Response} on error else false
 */
export async function formValidation(form: any, ip: string) {
	const required_fields = ['name', 'email', 'message']
	const bot_fields = ['bot-field']
	const email_field = 'email'

	for (const field of bot_fields) {
		if (form[field]) return JSONResponse(`'${capitalize(field)}' is a honeypot for bots. Are you a bot?`, 400)
	}

	for (const field of required_fields) {
		if (!form[field]) return JSONResponse(`'${capitalize(field)}' is a required field.`, 400)
	}

	// Check for valid email field
	const email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (!email_regex.test(form[email_field])) {
		return JSONResponse("Please enter a valid email address.", 400)
	}

	// let recaptchaError = await recaptchaValidation(form['token'], ip)
	// if (recaptchaError) {
	// 	return recaptchaError;
	// }

	return false;
}