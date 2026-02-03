<template>
	<div class="mobile-header-top__wrapper">
		<div class="mobile-header-top">
			<div class="mobile-header-top__brand">
				<CustomLogo />
			</div>
			<button
				class="mobile-header-top__menu-toggle"
				:aria-label="isMenuOpen ? closeSiteMenuLabel : openSiteMenuLabel"
				:aria-expanded="isMenuOpen"
				@click="$emit('toggle-menu')"
			>
				<span class="mobile-header-top__menu-icon" v-html="HamburgerIcon"></span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useHeaderTranslations, useHeaderDesign } from '../../composables'
import HamburgerIcon from '../../assets/hamburger-menu-icon.svg?raw'
import CustomLogo from '../layout/CustomLogo.vue'

defineProps<{
	isMenuOpen: boolean
}>()

defineEmits<{
	(e: 'toggle-menu'): void
}>()

const { translate } = useHeaderTranslations()
const { headerTextColor } = useHeaderDesign()

const openSiteMenuLabel = translate('$label.aria.open_site_menu', 'Open site menu')
const closeSiteMenuLabel = translate('$label.aria.close_site_menu', 'Close site menu')
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.mobile-header-top__wrapper {
  display: flex;
  justify-content: center;
  width: 100%;

  > * {
    width: 100%;
    max-width: c.$MOBILE_MAX_WIDTH;
  }
}

.mobile-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 24px 16px;
}

.mobile-header-top__brand {
  font-weight: inherit;
  text-transform: uppercase;
}

.mobile-header-top__menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: v-bind(headerTextColor);

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}

.mobile-header-top__menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  :deep(svg) {
    width: 100%;
    height: 100%;
    color: v-bind(headerTextColor);
  }
}
</style>
