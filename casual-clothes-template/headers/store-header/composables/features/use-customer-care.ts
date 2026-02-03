/**
 * useCustomerCare Composable
 * 
 * Provides access to customer care settings and visibility state.
 */

import { computed } from 'vue'
import { 
	useInputboxElementContent,
	useToggleElementDesign, 
} from '@lightspeed/crane'
import type { Content, Design } from '../../type'

export function useCustomerCare() {
	// ========================================
	// CONTENT HOOKS
	// ========================================
	const customerCareLinkContent = useInputboxElementContent<Content>('HeaderCustomerCareLink')

	// ========================================
	// DESIGN HOOKS
	// ========================================
	const customerCareVisibility = useToggleElementDesign<Design>('CustomerCareVisibility')

	// ========================================
	// COMPUTED PROPERTIES
	// ========================================

	/**
	 * Check if customer care feature should be displayed
	 * Requires: visibility enabled + content exists
	 */
	const hasCustomerCare = computed(() => {
		return customerCareVisibility.enabled && 
			customerCareLinkContent.hasContent
	})

	/**
	 * Get customer care label text
	 */
	const customerCareTitle = computed(() => {
		return customerCareLinkContent.value || 'Customer Care'
	})

	// ========================================
	// RETURN VALUES
	// ========================================
	return {
		hasCustomerCare,
		customerCareTitle,
	}
}
