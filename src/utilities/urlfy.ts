/**
 * Utility function to convert object to url string
 * 
 * @param {Object} obj 
 */
export const urlfy = (obj: any) =>
	Object.keys(obj)
		.map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
		.join("&")