<template>
	<footer :style="backgroundStyle">
		<LinksGroups />
		<SiteInfo />
	</footer>
	<FooterImage v-if="toglers?.isFooterImageAndText?.enabled" :style="backgroundStyle" />
</template>

<script lang="ts" setup>
import LinksGroups from '../links/LinksGroups.vue'
import SiteInfo from '../social/SiteInfo.vue'
import FooterImage from '../image/FooterImage.vue'
import { inject } from 'vue'
import { footerDesignKey, isElementsVisibleDesignKey } from '../../types/type.ts'
import { useBackgroundStyle } from '../../../../shared/composables'

const siteDesign = inject(footerDesignKey)
const toglers = inject(isElementsVisibleDesignKey)

const backgroundStyle = useBackgroundStyle(siteDesign?.background)
</script>

<style scoped>
 footer {
   display: flex;
   padding: 32px;
   flex-direction: column;
   align-items: flex-start;
   gap: 32px;
   align-self: stretch;
 }
</style>
