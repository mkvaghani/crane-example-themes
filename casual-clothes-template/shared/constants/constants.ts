/**
 * Shared constants for the casual-clothes-template
 *
 * Centralizes magic numbers and configuration values
 * for better maintainability and consistency.
 */

/**
 * Product fetch limits for different section types
 */
export const PRODUCTS_LIMITS = {
	/** Featured products section - shows 3 highlighted products */
	FEATURED: 3,
	/** Promotion highlights carousel - shows up to 8 products */
	PROMOTION: 8,
	/** Product carousel sections - shows up to 12 products */
	CAROUSEL: 12,
	/** Default limit when not specified */
	DEFAULT: 10,
} as const

/**
 * Category fetch limit
 */
export const CATEGORIES_LIMIT = 20
