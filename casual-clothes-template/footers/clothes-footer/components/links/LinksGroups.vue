<template>
	<div class="link-container" >
		<div
			class="link-item"
			v-if="linksGroups !== undefined && toglers?.isLinksGroup?.enabled">
			<div
				class="link-header"
				:style="titleStyle">
				{{ linksGroups.linksGroupAccountTitle.value }}
			</div>

			<div class="link-body">
				<div v-for="acc in linksGroups.accounts.value" :key="acc.id">
					<LinkButton
						v-if="acc.buttonLink !== undefined"
						:title="acc.buttonLink.title"
						:perform-action="acc.buttonLink.performAction"
					/>
				</div>

			</div>
		</div>

		<div
			class="link-item"
			v-if="linksGroups !== undefined && toglers?.isLinksGroup?.enabled">
			<div
				class="link-header"
				:style="titleStyle">
				{{ linksGroups.linksGroupCustomerCareTitle.value }}
			</div>

			<div class="link-body">
				<div v-for="cus in linksGroups.customerCares.value" :key="cus.id">
					<LinkButton
						v-if="cus.buttonLink !== undefined"
						:title="cus.buttonLink.title"
						:perform-action="cus.buttonLink.performAction"
					/>
				</div>
			</div>
		</div>

		<div
			class="link-item"
			v-if="linksGroups !== undefined && toglers?.isLinksGroup?.enabled">
			<div
				class="link-header"
				:style="titleStyle">
				{{ linksGroups.linksGroupCompanyTitle.value }}
			</div>

			<div class="link-body">
				<div v-for="com in linksGroups.companyCares.value" :key="com.id">
					<LinkButton
						v-if="com.buttonLink !== undefined"
						:title="com.buttonLink.title"
						:perform-action="com.buttonLink.performAction"
					/>
				</div>
			</div>
		</div>

		<div class="contact-me" v-if="siteInfo && toglers?.isContactUs?.enabled">
			<div class="contact-me-header" :style="titleStyle">
				{{ siteInfo.contactUsTitle.value }}
			</div>
			<div class="contact-me-info">
				<PhoneButton
					:phone="siteInfo.contactUsTelephone.phone!"
					:perform-action="siteInfo.contactUsTelephone.performAction">
				</PhoneButton>
				<EmailButton
					:email="siteInfo.contactUsMail.email!"
					:perform-action="siteInfo.contactUsMail.performAction">
				</EmailButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { footerDesignKey, isElementsVisibleDesignKey, linksGroupKey, siteInfoKey } from '../../types/type.ts'
import LinkButton from './LinkButton.vue'
import { computed, inject } from 'vue'
import { createTextStyle } from '../../../../shared/utils'
import EmailButton from '../contact/EmailButton.vue'
import PhoneButton from '../contact/PhoneButton.vue'

const linksGroups = inject(linksGroupKey)
const siteDesign = inject(footerDesignKey)
const siteInfo = inject(siteInfoKey)
const toglers = inject(isElementsVisibleDesignKey)

const titleStyle = computed(() => createTextStyle(siteDesign?.title))
</script>

<style scoped>

.link-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  width: 100%;
}

.link-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.link-header {
  line-height: 150%;
  letter-spacing: -0.08px;
}

.link-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  line-height: 150%;
  letter-spacing: -0.08px;
}

.contact-me{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 420px;
  justify-self: start;
}

.contact-me-header{
  line-height: 150%;
  letter-spacing: -0.08px;
}

.contact-me-info{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 150%;
  letter-spacing: -0.08px;
}

@media (max-width: 1000px) {
  .link-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .link-container {
    grid-template-columns: repeat(1, 1fr);
    gap: 32px;
  }
}
</style>
