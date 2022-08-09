/**
 * Helper function to return capitalize the first letter of a string.
 *
 * @param {string} str  String to be capitalized
 */

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}