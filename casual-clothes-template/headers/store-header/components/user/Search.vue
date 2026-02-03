<template>
	<a
		v-if="iconOnly"
		:href="searchUrl"
		class="search search--icon-only"
		:aria-label="searchText">
		<span class="search-icon" v-html="SearchIcon"></span>
	</a>
	<div v-else class="search">
		<NavigationLink
			:text="searchText"
			:url="searchUrl"
			:is-bold="true"
			variant="icon"
		>
			<span class="search-text">{{ searchText }}</span>
			<span class="search-icon" v-html="SearchIcon"></span>
		</NavigationLink>
	</div>
</template>

<script setup lang="ts">
import NavigationLink from '../ui/navigation-link'
import type { IconOnlyProps } from '../../types/common'
import { useHeaderTranslations, useHeaderDesign } from '../../composables'
import SearchIcon from '../../assets/search-icon.svg?raw'

withDefaults(defineProps<IconOnlyProps>(), {
	iconOnly: false,
})

const { translations, makeUrlLanguageAware } = useHeaderTranslations()
const { headerTextColor, headerFontFamily, headerFontSize } = useHeaderDesign()

const searchText = translations.search
const searchUrl = makeUrlLanguageAware('/products/search')
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
}

.search--icon-only {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: v-bind(headerTextColor);
  font-weight: inherit;
  cursor: pointer;
  background: none;
  border: none;
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
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

.search-icon {
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

.search-text {
  color: v-bind(headerTextColor);
  font-family: v-bind(headerFontFamily);
  font-size: v-bind(headerFontSize);
  font-style: inherit;
  font-weight: 700; /* Intentionally bold for emphasis */
  line-height: 150%;
  letter-spacing: -0.08px;
}
</style>
