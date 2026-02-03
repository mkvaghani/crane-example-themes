// Extract YouTube video ID from various formats (URL, embed code, or plain ID)
export function extractYouTubeId(input: string | undefined): string {
	if (!input) return ''

	const str = input.trim()
	if (!str) return ''

	// Already just an ID (11 characters, alphanumeric with _ and -)
	if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
		return str
	}

	// Extract from embed code: src="https://www.youtube.com/embed/VIDEO_ID..."
	const embedMatch = str.match(/src=["']https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/)
	if (embedMatch) return embedMatch[1]

	// Extract from watch URL: youtube.com/watch?v=VIDEO_ID
	const watchMatch = str.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
	if (watchMatch) return watchMatch[1]

	// Extract from any URL with /embed/ or /v/
	const urlMatch = str.match(/\/(?:embed|v)\/([a-zA-Z0-9_-]{11})/)
	if (urlMatch) return urlMatch[1]

	// If no match, return empty string - let it fail
	return ''
}
