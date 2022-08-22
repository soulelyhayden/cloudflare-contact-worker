import { JSONResponse } from "../utilities/JSONResponse"
const MailazyClient = require('mailazy-node');


const client = new MailazyClient({ accessKey: process.env.MAILAZY_ACCESS_KEY, accessSecret: process.env.MAILAZY_SECRET_KEY });

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
		from: 'no-reply@svey.xyz',
		to: form.receiver,
		subject: `New message from ${form.name}`,
		text: form.message,
		html: template,
		"h:Reply-To": form.email // reply to user
	}

	try {
		const resp = await client.send(data);
		console.log("resp: " + resp);
		return JSONResponse(form.successMessage)
	} catch (e) {
		console.log("errror: " + e);
		return JSONResponse("Oops! Something went wrong.", 400)
	}
}