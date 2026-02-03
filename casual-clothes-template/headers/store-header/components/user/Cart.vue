<template>
	<div class="cart">
		<NavigationLink
			:text="cartText"
			:url="cartUrl"
		/>
	</div>
</template>

<script setup lang="ts">
import NavigationLink from '../ui/navigation-link'
import { useHeaderTranslations } from '../../composables'

const { translations, makeUrlLanguageAware } = useHeaderTranslations()

const cartText = translations.cart
const cartUrl = makeUrlLanguageAware('/products/cart')
</script>

<style scoped>
.cart {
  display: flex;
  align-items: center;
}
</style>
