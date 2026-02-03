/**
 * Store Header Composables
 *
 * Organized into three categories:
 * - core/     - Base header functionality (design, toggles, translations, viewport)
 * - features/ - Specific feature implementations (categories, customer care, etc.)
 * - ui/       - UI utility composables (scroll lock, positioning)
 */

// Core composables
export {
	useHeaderDesign,
	useHeaderToggles,
	useHeaderTranslations,
	getHeaderTranslatedText,
	useHeaderViewport,
} from './core'

// Feature composables
export {
	useCategoryTree,
	useVisibleSubcategories,
	useCustomerCare,
	useContactForm,
	useLanguageSelector,
	useLocations,
} from './features'
export type { Language, ContactFormData, ContactFormErrors, FormState } from './features'

// UI composables
export {
	useBodyScrollLock,
	useSubmenuPosition,
} from './ui'

// Re-export shared composables used by header
export { useEscapeKey } from '../../../shared/composables'
