/**
 * useContactForm Composable
 *
 * Handles contact form submission with validation and error handling.
 * Integrates with the platform's contact form API for email delivery,
 * rate limiting, and spam protection.
 */

import { ref } from 'vue'
import { useInstantsiteJsApi } from '@lightspeed/crane'

export interface ContactFormData {
	name: string
	email: string
	phone?: string
	message: string
}

export interface ContactFormErrors {
	name?: string
	email?: string
	phone?: string
	message?: string
	general?: string
}

export type FormState = 'idle' | 'loading' | 'success' | 'error'

export function useContactForm() {
	const state = ref<FormState>('idle')
	const errors = ref<ContactFormErrors>({})

	const instantsite = useInstantsiteJsApi()

	/**
	 * Validate email format
	 */
	const isValidEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@(?:[^\s@.]+\.)+[A-Za-z]+$/
		return emailRegex.test(email)
	}

	/**
	 * Validate phone format (optional field)
	 */
	const isValidPhone = (phone: string): boolean => {
		if (!phone) return true // Phone is optional
		const phoneRegex = /^[\d\s\-+()]+$/
		return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 4
	}

	/**
	 * Validate form data
	 */
	const validateForm = (formData: ContactFormData): boolean => {
		errors.value = {}

		if (!formData.name.trim()) {
			errors.value.name = 'Name is required'
		}

		if (!formData.email.trim()) {
			errors.value.email = 'Email is required'
		} else if (!isValidEmail(formData.email)) {
			errors.value.email = 'Please enter a valid email address'
		}

		if (formData.phone && !isValidPhone(formData.phone)) {
			errors.value.phone = 'Please enter a valid phone number'
		}

		if (!formData.message.trim()) {
			errors.value.message = 'Message is required'
		}

		return Object.keys(errors.value).length === 0
	}

	/**
	 * Submit form to contact-us endpoint
	 */
	const submitForm = async (formData: ContactFormData): Promise<boolean> => {
		// Validate before submitting
		if (!validateForm(formData)) {
			state.value = 'error'
			return false
		}

		state.value = 'loading'
		errors.value = {}

		try {
			// Get site ID from InstantSite JS API
			const siteId = instantsite?.getSiteId()

			if (!siteId) {
				errors.value.general = 'Contact form only works in deployed environment. Please deploy to test.'
				state.value = 'error'
				return false
			}

			// Determine the correct service URL based on the current hostname
			// SSR guard: this function is only called on form submit (client-side user action)
			// eslint-disable-next-line no-restricted-globals -- SSR-safe: typeof check
			if (typeof window === 'undefined') {
				errors.value.general = 'Form submission requires browser environment'
				state.value = 'error'
				return false
			}

			const endpoint = 'https://vuega.ecwid.com/contact-us'

			const payload = {
				siteId: siteId.toString(),
				senderName: formData.name,
				senderEmail: formData.email,
				senderPhone: formData.phone || '',
				message: formData.message,
				additionalNote: '',
				senderTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				website: '', // Honeypot field for spam protection - must be empty
				createdDateTime: Date.now(),
			}

			// Submit to contact-us endpoint
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})

			if (!response.ok) {
				throw new Error(`Failed to submit form: ${response.status}`)
			}

			await response.json()

			state.value = 'success'
			return true
		} catch (err) {
			state.value = 'error'

			// Handle different error types
			if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
				// Network/CORS error
				errors.value.general = 'Unable to connect to the server. Please try again or email us directly at: support@example.com'
			} else if (err instanceof Error && (err.message.includes('405') || err.message.includes('404'))) {
				// Method not allowed or not found - endpoint might not exist
				errors.value.general = 'Service temporarily unavailable. Please email us directly at: support@example.com'
			} else {
				errors.value.general = err instanceof Error ? err.message : 'Failed to submit form. Please try again.'
			}
			return false
		}
	}

	/**
	 * Reset form state
	 */
	const reset = () => {
		state.value = 'idle'
		errors.value = {}
	}

	/**
	 * Clear a specific field error
	 */
	const clearFieldError = (field: keyof ContactFormErrors) => {
		if (errors.value[field]) {
			delete errors.value[field]
		}
	}

	return {
		state,
		errors,
		submitForm,
		reset,
		clearFieldError,
	}
}
