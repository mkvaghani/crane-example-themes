/**
 * Utility functions for error handling across the application
 */

/**
 * Converts an unknown error into a user-friendly error message
 *
 * @param error - The error object (can be Error, string, or unknown)
 * @returns User-friendly error message
 *
 * @example
 * ```typescript
 * try {
 *   await fetchData();
 * } catch (error) {
 *   const message = getErrorMessage(error);
 *   console.error(message);
 * }
 * ```
 */
export function getErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		// Network errors
		if (error.message.includes('network') || error.message.includes('fetch')) {
			return 'Network error. Please check your internet connection.'
		}

		// Authentication errors
		if (error.message.includes('unauthorized') || error.message.includes('401')) {
			return 'Authentication failed. Please check your API credentials.'
		}

		// Timeout errors
		if (error.message.includes('timeout')) {
			return 'Request timed out. Please try again.'
		}

		// Return the original error message
		return error.message
	}

	// Handle string errors
	if (typeof error === 'string') {
		return error
	}

	// Fallback for unknown error types
	return 'An unexpected error occurred. Please try again.'
}

/**
 * Logs an error with context information
 *
 * @param context - Context string describing where the error occurred
 * @param error - The error object
 *
 * @example
 * ```typescript
 * try {
 *   await fetchProducts();
 * } catch (error) {
 *   logError('useProducts.fetchProducts', error);
 * }
 * ```
 */
export function logError(context: string, error: unknown): void {
	 
	console.error(`[${context}]`, error)
}
