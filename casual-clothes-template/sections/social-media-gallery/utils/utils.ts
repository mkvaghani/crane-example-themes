import { TextSegment } from '../types'

// Parse subtitle to safely render hashtags with strong styling
export function parseSubtitleSegments(sectionSubtitle: string | undefined) {
	const text = sectionSubtitle || ''
	const segments: TextSegment[] = []
	const hashtagRegex = /(#\w+)/g
	let lastIndex = 0
	let match: RegExpExecArray | null

	while ((match = hashtagRegex.exec(text)) !== null) {
		// Add text before hashtag
		if (match.index > lastIndex) {
			segments.push({
				text: text.substring(lastIndex, match.index),
				isHashtag: false,
			})
		}
		// Add hashtag
		segments.push({
			text: match[0],
			isHashtag: true,
		})
		lastIndex = match.index + match[0].length
	}

	// Add remaining text
	if (lastIndex < text.length) {
		segments.push({
			text: text.substring(lastIndex),
			isHashtag: false,
		})
	}

	return segments.length > 0 ? segments : [{ text, isHashtag: false }]
}
