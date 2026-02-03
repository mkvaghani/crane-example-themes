/**
 * Shared Composables
 *
 * Re-export all shared composables for convenient imports.
 * These composables are generic and can be used across multiple components.
 *
 * Organized by category:
 * - design/  - CSS styles from Crane design data
 * - data/    - Fetching data from Ecwid API
 * - ui/      - UI interactions and state management
 * - crane/   - Crane SDK integration
 */

// Design - CSS styles from Crane design data
export { useBackgroundStyle, getBackgroundValue, useButtonStyles } from './design'

// Data - Fetching data from Ecwid API
export { useCategories, useProducts } from './data'

// UI - UI interactions and state management
export { useCarousel, useClickOutside, useEscapeKey } from './ui'

// Crane - Crane SDK integration
export {
	useMappedDeckCards,
	field,
	createFieldConfig,
	usePreviewMode,
	useTranslations,
	type TranslationDictionary,
} from './crane'
