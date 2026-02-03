<template>
	<div v-if="hasActions" class="mobile-header-actions__wrapper">
		<div class="mobile-header-actions">
			<Account v-if="accountShow.enabled" />
			<Favorites v-if="wishlistShow.enabled" />
			<Cart v-if="cartShow.enabled" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Account from '../user/Account.vue'
import Favorites from '../user/Favorites.vue'
import Cart from '../user/Cart.vue'
import { useHeaderToggles } from '../../composables'

const { accountShow, wishlistShow, cartShow } = useHeaderToggles()

const hasActions = computed(() => {
	return accountShow.enabled || wishlistShow.enabled || cartShow.enabled
})
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.mobile-header-actions__wrapper {
  display: flex;
  justify-content: center;
  width: 100%;

  > * {
    width: 100%;
    max-width: c.$MOBILE_MAX_WIDTH;
  }
}

.mobile-header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 16px 16px;
}
</style>
