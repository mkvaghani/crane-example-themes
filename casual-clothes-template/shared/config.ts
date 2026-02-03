/**
 * Configuration for Ecwid API integration
 */
export const STORE_CONFIG = {
	/**
	 * Client ID of the App
	 * MUST match app_client_id in crane.config.json
	 * Set via VITE_APP_CLIENT_ID environment variable
	 */
	clientId: import.meta.env.VITE_APP_CLIENT_ID || 'atelier',

	/**
	 * Base URL for Ecwid API
	 * Set via VITE_ECWID_BASE_URL environment variable
	 *
	 * Common values:
	 * - undefined or empty (default): Production API
	 */
	baseURL: import.meta.env.VITE_ECWID_BASE_URL || undefined,
}
