import { computed, type ComputedRef } from 'vue'
import { getColorHex, calculateTextColor } from '../../utils'

/**
 * Generates dynamic button styles based on Crane's button design data
 * 
 * Handles:
 * - Size: 'small', 'medium', 'large' (lowercase from Crane)
 * - Appearance: 'solid-button', 'outline-button', 'text-link'
 * - Style (shape): 'rectangle', 'round-corner', 'pill'
 * 
 * @param buttonDesign - Button design data from useButtonElementDesign
 * @returns Computed style object for inline application
 * 
 * @example
 * const ctaButtonDesign = useButtonElementDesign<Design>('cta_button')
 * const ctaButtonStyle = useButtonStyles(ctaButtonDesign)
 * 
 * // In template:
 * <button :style="ctaButtonStyle">Click me</button>
 */
export function useButtonStyles(
	buttonDesign: Partial<ButtonDesignData> | undefined,
): ComputedRef<Record<string, string>> {
	return computed(() => {
		// Hide button if not visible
		if (!buttonDesign?.visible) return { display: 'none' }

		const styles: Record<string, string> = {
			fontFamily: buttonDesign.font || 'Inter',
			fontWeight: '400',
		}

		// Size handling - Crane returns lowercase values
		const size = buttonDesign.size as string
		switch (size) {
			case 'small':
				styles.fontSize = '14px'
				styles.padding = '8px 16px'
				break
			case 'large':
				styles.fontSize = '18px'
				styles.padding = '12px 24px'
				break
			case 'medium':
			default:
				styles.fontSize = '16px'
				styles.padding = '10px 20px'
				break
		}

		// Appearance and Color handling
		const color = getColorHex(buttonDesign.color) || '#000000'
		const appearance = buttonDesign.appearance as string

		switch (appearance) {
			case 'outline-button':
				styles.backgroundColor = 'transparent'
				styles.color = color
				styles.border = `2px solid ${color}`
				break
			case 'text-link':
				// Text link - just text, no background, no border
				styles.backgroundColor = 'transparent'
				styles.color = color
				styles.border = 'none'
				styles.padding = '0'
				styles.textDecoration = 'none'
				break
			case 'solid-button':
			default:
				styles.backgroundColor = color
				// Calculate optimal text color based on background brightness
				styles.color = calculateTextColor(color)
				styles.border = `1px solid ${color}`
				break
		}

		// Style (border-radius) - applies to all button types except text-link
		if (appearance !== 'text-link') {
			const style = buttonDesign.style as string
			switch (style) {
				case 'pill':
					styles.borderRadius = '999px'
					break
				case 'round-corner':
					styles.borderRadius = '4px'
					break
				case 'rectangle':
				default:
					styles.borderRadius = '0'
					break
			}
		} else {
			styles.borderRadius = '0'
		}

		return styles
	})
}
