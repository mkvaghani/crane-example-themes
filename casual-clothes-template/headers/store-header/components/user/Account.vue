<template>
	<div class="profile-login">
		<NavigationLink :text="accountText" :url="accountUrl" />
	</div>
</template>

<script setup lang="ts">
import NavigationLink from '../ui/navigation-link'
import { useHeaderTranslations } from '../../composables'

const { translations, makeUrlLanguageAware } = useHeaderTranslations()

const accountText = translations.account
const accountUrl = makeUrlLanguageAware('/products/account')
</script>

<style scoped>
.profile-login {
  display: flex;
  align-items: center;
}
</style>
