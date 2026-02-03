<template>
	<div v-if="hasContent" class="mobile-header-bottom__wrapper">
		<div class="mobile-header-bottom">
			<button 
				v-if="categoriesShow.enabled" 
				class="mobile-header-bottom__catalog-btn" 
				@click="$emit('toggle-catalog')"
			>
				{{ catalogLabel }}
			</button>
			<Search v-if="searchShow.enabled" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Search from '../user/Search.vue'
import { useHeaderToggles, useHeaderTranslations, useHeaderDesign } from '../../composables'

defineEmits<{
	(e: 'toggle-catalog'): void
}>()

const { searchShow, categoriesShow } = useHeaderToggles()
const { translations } = useHeaderTranslations()
const { headerTextColor, headerFontFamily, headerFontSize } = useHeaderDesign()

const catalogLabel = translations.catalog

const hasContent = computed(() => {
	return searchShow.enabled || categoriesShow.enabled
})
</script>

<style scoped lang="scss">
@use '../../constants' as c;

.mobile-header-bottom__wrapper {
  display: flex;
  justify-content: center;
  width: 100%;

  > * {
    width: 100%;
    max-width: c.$MOBILE_MAX_WIDTH;
  }
}

.mobile-header-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.mobile-header-bottom__catalog-btn {
  background: none;
  border: none;
  color: v-bind(headerTextColor);
  font-family: v-bind(headerFontFamily);
  font-weight: 700;
  font-size: v-bind(headerFontSize);
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s ease;

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
</style>
