import { JSONResponse } from "../utilities/JSONResponse"
import { urlfy } from "../utilities/urlfy"

const config = {
	from: "no-reply <no-reply@haydensoule.com>",
	mailgun_domain: "mail.haydensoule.com",
	mailgun_key: process.env.MAILGUN_API_KEY
}

/**
 * Send the message to MailGun
 * 
 * @param {JSON} form 
 */
export async function sendMessage(form: any) {
	const template = `
    <html>
    <head>
        <title>New message from ${form.name}</title>
    </head>
    <body>
    New message has been sent via website.<br><br>
    <b>Name:</b> ${form.name} <br>
    <b>Email:</b> ${form.email} <br>
    <br>
    <b>Message:</b><br>
    ${form.message.replace(/(?:\r\n|\r|\n)/g, "<br>")}
    </body>
    </html>
    `

	const data = {
		from: config.from,
		to: form.receiveMail,
		subject: `New message from ${form.name}`,
		html: template,
		"h:Reply-To": form.email // reply to user
	}

	try {
		// await fetch(`https://api.mailgun.net/v3/${config.mailgun_domain}/messages`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Authorization": "Basic " + btoa("api:" + config.mailgun_key),
		// 		"Content-Type": "application/x-www-form-urlencoded",
		// 		"Content-Length": (String)(Object.keys(data).length)
		// 	},
		// 	body: urlfy(data)
		// })

		return JSONResponse(form.successMessage)
	} catch (err) {
		console.log("Fetch error", err)
		return JSONResponse("Oops! Something went wrong.", 400)
	}
}