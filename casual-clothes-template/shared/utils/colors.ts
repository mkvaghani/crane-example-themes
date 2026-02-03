/**
 * Extract hex color value from various color formats
 * @param color - Color value that can be a string, object with hex property, or undefined
 * @returns Hex color string or '#000' as fallback
 */
export function getColorHex(color: string | { hex: string } | undefined): string {
	if (typeof color === 'string') return color
	if (color && typeof color === 'object' && 'hex' in color) return color.hex
	return '#000'
}

export function calculateTextColor(hexColor: string): string {
	// Удаляем # если есть
	const hex = hexColor.replace('#', '')

	// Конвертируем hex в RGB
	const r = parseInt(hex.substring(0, 2), 16)
	const g = parseInt(hex.substring(2, 4), 16)
	const b = parseInt(hex.substring(4, 6), 16)

	// Вычисляем яркость
	const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255

	return brightness < 0.5 ? '#ffffff' : '#000000'
}
