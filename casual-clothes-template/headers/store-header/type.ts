/**
 * Header Type Definitions
 * 
 * This file defines TypeScript types and interfaces for the header component.
 * Provides type safety and better development experience.
 */

import ContentSettings from './settings/content.ts'
import DesignSettings from './settings/design.ts'

// ========================================
// CONTENT TYPES
// ========================================

/**
 * Main content type inferred from content settings
 */
export type Content = InferContentType<typeof ContentSettings>;

/**
 * Design type inferred from design settings
 */
export type Design = InferDesignType<typeof DesignSettings>;

// ========================================
// NAVIGATION LINK INTERFACES
// ========================================

/**
 * Navigation Menu DECK Content Structure
 */
export interface NavigationMenuContent {
  cards: NavigationLinkCard[];
  hasContent: boolean;
}

/**
 * Individual Navigation Link Card
 */
export interface NavigationLinkCard {
  settings: {
    title: string;
    url: string;
    description?: string;
  };
}

/**
 * Navigation link button content structure (legacy)
 */
export interface NavigationLinkContent {
  title: string;
  link: string;
  buttonType: 'GO_TO_STORE_LINK';
}

/**
 * Key info bar content structure
 */
export interface KeyInfoBarContent {
  text: string;
}

/**
 * Logo content structure
 */
export interface LogoContent {
  text: string;
}

// ========================================
// DESIGN INTERFACES
// ========================================

/**
 * Text styling configuration
 */
export interface TextStyling {
  font: string;
  size: number;
  bold: boolean;
  italic: boolean;
  color: string;
  visible: boolean;
}

/**
 * Background styling configuration
 */
export interface BackgroundStyling {
  style: 'COLOR' | 'GRADIENT' | 'IMAGE';
  color: string;
}

/**
 * Toggle control configuration
 */
export interface ToggleControl {
  enabled: boolean;
}

// ========================================
// VALIDATION INTERFACES
// ========================================

/**
 * Field validation rules
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  format?: 'uri' | 'email' | 'phone';
}

/**
 * Validation configuration for content fields
 */
export interface ValidationConfig {
  [fieldName: string]: ValidationRule;
}
