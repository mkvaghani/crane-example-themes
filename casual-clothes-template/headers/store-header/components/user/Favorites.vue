<template>
	<div class="favorites">
		<NavigationLink
			:text="favoritesText"
			:url="favoritesUrl"
		/>
	</div>
</template>

<script setup lang="ts">
import NavigationLink from '../ui/navigation-link'
import { useHeaderTranslations } from '../../composables'

const { translations, makeUrlLanguageAware } = useHeaderTranslations()

const favoritesText = translations.favorites
const favoritesUrl = makeUrlLanguageAware('/products/account/favorites')
</script>

<style scoped>
.favorites {
  display: flex;
  align-items: center;
}
</style>
