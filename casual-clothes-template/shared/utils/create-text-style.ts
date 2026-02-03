import { getColorHex } from './colors'

/**
 * Options for text style creation with default values
 */
export interface TextStyleOptions {
	/** Default font family if not specified in design */
	defaultFont?: string
	/** Default font size in pixels if not specified in design */
	defaultSize?: number
	/** Default color if not specified in design */
	defaultColor?: string
}

/**
 * Creates a style object from Crane TextDesignData
 *
 * Transforms text design settings into CSS style properties.
 * Handles visibility, font family, size, color, weight, style, and decoration.
 *
 * @param design - TextDesignData from useTextElementDesign
 * @param options - Optional default values for font, size, and color
 * @returns CSS style object ready for :style binding
 *
 * @example
 * ```typescript
 * const productName = useTextElementDesign<Design>('product_name') as TextDesignData
 * const productNameStyle = computed(() => createTextStyle(productName, {
 *   defaultFont: 'Inter',
 *   defaultSize: 16,
 * }))
 *
 * // In template:
 * // <span :style="productNameStyle">{{ name }}</span>
 * ```
 */
export function createTextStyle(
	design: TextDesignData | undefined,
	options: TextStyleOptions = {},
): Record<string, string> {
	const {
		defaultFont = 'Inter',
		defaultSize = 16,
		defaultColor = '#000000',
	} = options

	// Handle hidden elements
	if (design && !design.visible) {
		return { display: 'none' }
	}

	if (!design) {
		return {
			fontFamily: defaultFont,
			fontSize: `${defaultSize}px`,
			color: defaultColor,
		}
	}

	return {
		fontFamily: design.font || defaultFont,
		fontSize: design.size ? `${design.size}px` : `${defaultSize}px`,
		color: getColorHex(design.color) || defaultColor,
		fontWeight: design.bold ? 'bold' : 'normal',
		fontStyle: design.italic ? 'italic' : 'normal',
	}
}
