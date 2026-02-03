import { computed, type ComputedRef } from 'vue'
import { getColorHex } from '../../utils'

/**
 * Extracts background value as a CSS string from BackgroundDesignData
 *
 * Returns a string suitable for CSS `background` property.
 * For solid colors returns hex color, for gradients returns linear-gradient.
 *
 * @param backgroundDesign - BackgroundDesignData from useBackgroundElementDesign
 * @param fallback - Optional fallback value if no background is defined
 * @returns CSS background value string or fallback
 *
 * @example
 * ```typescript
 * const backgroundDesign = useBackgroundElementDesign<Design>('background') as BackgroundDesignData
 * const bgValue = getBackgroundValue(backgroundDesign, '#FFFFFF')
 * // Returns: '#FF0000' or 'linear-gradient(to right, #FF0000, #00FF00)'
 * ```
 */
export function getBackgroundValue(
	backgroundDesign: BackgroundDesignData | undefined,
	fallback: string = '',
): string {
	if (!backgroundDesign?.background) {
		return fallback
	}

	const { background } = backgroundDesign

	if (background.type === 'solid' && background.solid?.color) {
		return getColorHex(background.solid.color) || fallback
	}

	if (background.type === 'gradient' && background.gradient) {
		const { fromColor, toColor } = background.gradient
		return `linear-gradient(to right, ${getColorHex(fromColor)}, ${getColorHex(toColor)})`
	}

	return fallback
}

/**
 * Creates reactive background styles from Crane BackgroundDesignData
 *
 * Supports solid colors and gradients. Returns a computed style object
 * that can be bound directly to :style attribute.
 *
 * @param backgroundDesign - BackgroundDesignData from useBackgroundElementDesign
 * @returns Computed style object with backgroundColor or backgroundImage
 *
 * @example
 * ```typescript
 * const backgroundDesign = useBackgroundElementDesign<Design>('background') as BackgroundDesignData
 * const backgroundStyle = useBackgroundStyle(backgroundDesign)
 *
 * // In template:
 * // <div :style="backgroundStyle">...</div>
 * ```
 */
export function useBackgroundStyle(
	backgroundDesign: BackgroundDesignData | undefined,
): ComputedRef<Record<string, string>> {
	return computed((): Record<string, string> => {
		if (!backgroundDesign?.background) {
			return {}
		}

		const { background } = backgroundDesign

		if (background.type === 'solid' && background.solid?.color) {
			return {
				backgroundColor: getColorHex(background.solid.color),
			}
		}

		if (background.type === 'gradient' && background.gradient) {
			const { fromColor, toColor } = background.gradient
			return {
				backgroundImage: `linear-gradient(to right, ${getColorHex(fromColor)}, ${getColorHex(toColor)})`,
			}
		}

		return {}
	})
}
