/**
 * useLocations Composable
 *
 * Provides access to store locations data and settings.
 * Uses useMappedDeckCards for type-safe, reactive DECK content mapping.
 */

import { computed } from 'vue'
import {
	useDeckElementContent,
	useTextareaElementContent,
	useToggleElementDesign,
	useSelectboxElementDesign,
} from '@lightspeed/crane'
import { useMappedDeckCards } from '../../../../shared/composables'
import type { Content, Design } from '../../type'
import { LocationCard, LocationDeckConfig } from '../../types/locations'

export function useLocations() {
	// ========================================
	// CONTENT HOOKS
	// ========================================
	const locationsRaw = useDeckElementContent<Content>('locations')
	const viewOnMapTextContent = useTextareaElementContent<Content>('LocationsViewOnMapText')

	// ========================================
	// DESIGN HOOKS
	// ========================================
	const locationsVisibility = useToggleElementDesign<Design>('LocationsVisibility')
	const mapDisplay = useToggleElementDesign<Design>('LocationsMapDisplay')
	const mapZoomRaw = useSelectboxElementDesign<Design>('LocationsMapZoom')

	// ========================================
	// MAPPED DECK CARDS
	// ========================================

	/**
	 * Map location cards with reactive references
	 * Automatically filters out cards with empty content
	 */
	const locationCards = useMappedDeckCards<LocationCard, Content>(
		locationsRaw,
		LocationDeckConfig,
		{ filterEmptyContent: true },
	)

	// ========================================
	// COMPUTED PROPERTIES
	// ========================================

	/**
	 * Check if locations feature should be displayed
	 * Requires: visibility enabled + content exists + at least one location
	 */
	const hasLocations = computed(() => {
		return locationsVisibility.enabled &&
			locationsRaw.hasContent &&
			locationCards.value.length > 0
	})

	/**
	 * Check if map should be displayed
	 * Requires: map display enabled + locations exist
	 */
	const showMap = computed(() => {
		return mapDisplay.enabled && hasLocations.value
	})

	/**
	 * Get customizable "View on map" link text
	 */
	const viewOnMapText = computed(() => {
		return viewOnMapTextContent.value || 'View on map'
	})

	/**
	 * Get map zoom level as number
	 * Converts selectbox string value to number
	 */
	const mapZoom = computed(() => {
		return parseInt(mapZoomRaw.value || '15', 10)
	})

	// ========================================
	// RETURN VALUES
	// ========================================
	return {
		// Data (reactive LocationCard objects)
		locationCards,
		hasLocations,
		showMap,
		viewOnMapText,
		mapZoom: mapZoom.value, // Map zoom level (3-18)
	}
}
