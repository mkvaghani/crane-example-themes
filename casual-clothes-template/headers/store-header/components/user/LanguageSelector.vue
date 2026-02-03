<template>
	<client-only>
		<div v-if="hasMultipleLanguages" class="language-selector">
			<NormalDropdown
				v-if="isDesktop"
				:text-color="headerTextColor"
			>
				<template #trigger="{ isDropdownOpen }">
					<div
						class="language-trigger-wrapper"
						:style="{backgroundColor: headerBackgroundColor, color: headerTextColor}"
					>
						<LanguageTrigger :display-code="getDisplayLanguageCode(currentLanguage?.code || 'en')" />
						<div :style="{transform: `${isDropdownOpen ? '': 'rotate(180deg)'}`}">
							<span class="language-trigger__arrow" v-html="DropdownArrowIcon"></span>
						</div>
					</div>
				</template>
				<template #content>
					<div
						:style="{ backgroundColor: headerBackgroundColor, color: headerTextColor }"
						class="submenu-overlay__content"
					>
						<LanguageList
							:languages="sortedLanguages"
							:get-display-code="getDisplayLanguageCode"
							@select="onSelect"
						/>
					</div>
				</template>
			</NormalDropdown>

			<MobileDropdown
				v-else
				:background-color="headerBackgroundColor"
				:text-color="headerTextColor"
			>
				<template #trigger>
					<LanguageTrigger
						:display-code="getDisplayLanguageCode(currentLanguage?.code || 'en')"
						:show-arrow="true"
					/>
				</template>
				<LanguageList
					:languages="sortedLanguages"
					:get-display-code="getDisplayLanguageCode"
					@select="onSelect"
				/>
			</MobileDropdown>
		</div>
	</client-only>
</template>

<script setup lang="ts">
import { MobileDropdown, NormalDropdown } from '../ui/dropdown'
import LanguageTrigger from './LanguageTrigger.vue'
import LanguageList from './LanguageList.vue'
import { useHeaderViewport, useHeaderDesign, useLanguageSelector, type Language } from '../../composables'
import DropdownArrowIcon from '../../assets/dropdown-arrow.svg?raw'

const { isDesktop } = useHeaderViewport()
const { headerBackgroundColor, headerTextColor } = useHeaderDesign()

const {
	sortedLanguages,
	hasMultipleLanguages,
	currentLanguage,
	getDisplayLanguageCode,
	navigateToTranslationPage,
} = useLanguageSelector()

const onSelect = (language: Language) => {
	navigateToTranslationPage(language)
}
</script>

<style scoped lang="scss">
.language-selector {
  display: flex;
  align-items: center;
}

.language-trigger-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: opacity 0.2s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
}

.language-trigger__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 6px;

  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

.submenu-overlay__content {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  min-width: 100px;
}
</style>
