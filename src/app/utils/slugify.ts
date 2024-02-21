const MULTIPLE_HYPHENS_REGEX = /--+/g
const NON_WORD_CHARACTERS_REGEX = /[^\w\s-]/g
const WHITESPACE_REGEX = /\s+/g

/**
 * Converts a string to a slug
 *
 * @example
 * slugify('Hello World') // 'hello-world'
 */
export function slugify(value: String) {
	return value
		.toLowerCase()
		.replace(NON_WORD_CHARACTERS_REGEX, '')
		.replace(WHITESPACE_REGEX, '-')
		.replace(MULTIPLE_HYPHENS_REGEX, '-')
		.trim()
}
