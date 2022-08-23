import { JSONResponse } from "../utilities/JSONResponse"

/**
 * Send the message to MailGun
 * 
 * @param {JSON} form 
 */
export async function sendMessage(form: any) {
	let websiteName = 'svey.xyz';

	let websiteURL = 'svey.xyz'
	form.title = 'contact-form'

	const data = {
		receiverName: 'svey',
		senderName: form.name,
		from: `no-reply-${form.title}@${websiteURL}`,
		to: form.receiver,
		replyTo: form.email,
		subject: `New Submission on ${websiteName}, through ${form.title}`,
		message: form.message,
		// "h:Reply-To": form.email // reply to user
	}

	const request = new Request('https://api.mailchannels.net/tx/v1/send', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			personalizations: [
				{
					to: [{ email: data.to, name: data.receiverName }],
					reply_to: { email: data.replyTo, name: data.senderName },
				},
			],
			from: {
				email: data.from,
				name: data.senderName,
			},
			subject: data.subject,
			content: [
				{
					type: 'text/plain',
					value: data.message,
				},
			],
		}),
	})

	try {
		let response = await fetch(request);
		
		return JSONResponse(response!.statusText)
	} catch (e) {
		return JSONResponse("Oops! Something went wrong.", 400)
	}
}