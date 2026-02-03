import type { Category } from './category'

/**
 * Common Props Types
 */

/**
 * Props for components that have an open/close state
 */
export interface OverlayProps {
  isOpen: boolean;
}

/**
 * Props for components that display a category
 */
export interface CategoryProps {
  category: Category | null;
}

/**
 * Props for components that track an active category
 */
export interface ActiveCategoryProps {
  activeCategory?: Category | null;
}

/**
 * Props for components with category overlay functionality
 */
export interface CatalogOverlayProps extends OverlayProps, CategoryProps {}

/**
 * Props for components with optional icon-only display
 */
export interface IconOnlyProps {
  iconOnly?: boolean;
}

/**
 * Common Emits Types
 */

/**
 * Emits for components that can be closed
 */
export interface CloseEmits {
  (e: 'close'): void;
}

/**
 * Emits for components that open catalog/category submenus
 */
export interface OpenCatalogEmits {
  (e: 'open-catalog', category: Category): void;
}

/**
 * Emits for nested overlays that can close themselves and parent overlays
 */
export interface CascadeCloseEmits extends CloseEmits {
  (e: 'close-all'): void;
}

/**
 * Combined emits for catalog overlay components
 */
export interface CatalogOverlayEmits extends CloseEmits, OpenCatalogEmits {}
