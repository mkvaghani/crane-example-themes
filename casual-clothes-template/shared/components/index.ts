/**
 * Shared Components
 *
 * Reusable UI components for the casual-clothes-template.
 * These components are used across multiple sections.
 *
 * Note: Header-specific components (dropdown, overlay, navigation-link, DropdownArrowIcon)
 * have been moved to headers/store-header/components/ui/
 */

// Core UI Components
export { default as Badge } from './Badge.vue'
export { default as Button } from './Button.vue'
export { default as Skeleton } from './Skeleton.vue'

// State Components
export { default as EmptyState } from './EmptyState.vue'
export { default as ErrorState } from './ErrorState.vue'

// Layout Components
export { default as SectionHeader } from './SectionHeader.vue'
export { default as SectionWrapper } from './SectionWrapper.vue'

// Navigation Components
export { default as NavigationButtons } from './NavigationButtons.vue'

// Icons (used by Button.vue)
export { default as ArrowRightIcon } from './icons/ArrowRightIcon.vue'
