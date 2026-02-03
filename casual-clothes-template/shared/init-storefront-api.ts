import { useInstantsiteJsApi } from '@lightspeed/crane'
import { initStorefrontApi } from '@lightspeed/ecom-headless'

import { STORE_CONFIG } from './config'

export async function useInitStorefrontApi() {
	const publicToken = useInstantsiteJsApi()?.getAppPublicToken(STORE_CONFIG.clientId) ?? ''
	const storeId = useInstantsiteJsApi()?.getSiteId()
	await initStorefrontApi({
		publicToken,
		storeId,
		...(STORE_CONFIG.baseURL ? { baseURL: STORE_CONFIG.baseURL } : {}),
	})

	return {
		publicToken,
		storeId,
	}
}
