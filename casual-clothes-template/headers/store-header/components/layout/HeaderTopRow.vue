<template>
	<div class="header-top-row">
		<div class="header-top-row__left">
			<CustomLogo></CustomLogo>

			<NavigationMenu
				@open-find-store="$emit('open-find-store')"
				@open-customer-care="$emit('open-customer-care')" />
		</div>
		<div class="header-top-row__right">
			<LanguageSelector v-if="languageSwitcherShow.enabled" />
			<Account v-if="accountShow.enabled" />
			<Favorites v-if="wishlistShow.enabled" />
			<Cart v-if="cartShow.enabled" />
		</div>
	</div>
</template>

<script setup lang="ts">
import LanguageSelector from '../user/LanguageSelector.vue'
import Account from '../user/Account.vue'
import Favorites from '../user/Favorites.vue'
import Cart from '../user/Cart.vue'
import NavigationMenu from '../navigation/NavigationMenu.vue'
import { useHeaderToggles } from '../../composables'
import CustomLogo from './CustomLogo.vue'

defineEmits<{
	(e: 'open-find-store'): void
	(e: 'open-customer-care'): void
}>()

const { languageSwitcherShow, accountShow, wishlistShow, cartShow } = useHeaderToggles()
</script>

<style scoped lang="scss">
.header-top-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40px;
	/* Inherit background from parent header */
	gap: 1rem;
	min-height: 40px;
}

.header-top-row__left {
	display: flex;
	align-items: center;
	gap: clamp(16px, 2rem, 32px);
	flex: 1;
}

.header-top-row__right {
	display: flex;
	align-items: center;
	gap: clamp(8px, 1rem, 16px);
	flex-shrink: 0;
}
</style>
