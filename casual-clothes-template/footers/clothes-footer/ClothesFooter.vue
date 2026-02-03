<template>
	<BaseFooter />
</template>

<script setup lang="ts">
import {
	ButtonContent,
	ImageContent,
	InputBoxContent,
	useBackgroundElementDesign,
	useButtonElementContent,
	useDeckElementContent,
	useImageElementContent,
	useInputboxElementContent,
	useTextElementDesign,
	useToggleElementDesign,
} from '@lightspeed/crane'
import { useMappedDeckCards } from '../../shared/composables'
import {
	footerDesignKey,
	footerImageKey,
	isElementsVisibleDesignKey,
	LinksGroup,
	LinksGroupDeckConfig,
	linksGroupKey,
	siteInfoKey,
	SocialMediaLink,
	SocialMediaLinkDeckConfig,
} from './types/type.ts'
import { Content, Design } from './type.ts'
import BaseFooter from './components/layout/BaseFooter.vue'
import { provide } from 'vue'

// Account links section
const linksGroupAccountTitle = useInputboxElementContent('linksGroupAccountTitle') as InputBoxContent
const linksGroupAccountRaw = useDeckElementContent('linksGroupAccount')

// Customer Care links section
const linksGroupCustomerCareTitle = useInputboxElementContent('linksGroupCustomerCareTitle') as InputBoxContent
const linksGroupCustomerCareRaw = useDeckElementContent('linksGroupCustomerCare')

// Company links section
const copyrightNotice = useInputboxElementContent('copyrightNotice') as InputBoxContent
const linksGroupCompanyTitle = useInputboxElementContent('linksGroupCompanyTitle') as InputBoxContent
const linksGroupCompanyCareRaw = useDeckElementContent('linksGroupCompanyCare')
const legalAndTechnicalLinksRaw = useDeckElementContent('legalAndTechnicalLinks')
const socialMediaLinksRaw = useDeckElementContent('socialMediaLinks')

const accounts = useMappedDeckCards<LinksGroup, Content>(linksGroupAccountRaw, LinksGroupDeckConfig)
const customerCares = useMappedDeckCards<LinksGroup, Content>(linksGroupCustomerCareRaw, LinksGroupDeckConfig)
const companyCares = useMappedDeckCards<LinksGroup, Content>(linksGroupCompanyCareRaw, LinksGroupDeckConfig)

const contactUsTitle = useInputboxElementContent('contactUsTitle') as InputBoxContent
const contactUsTelephone = useButtonElementContent('contactUsTelephone') as ButtonContent
const contactUsMail = useButtonElementContent('contactUsMail') as ButtonContent

const legalAndTechnicalLinks = useMappedDeckCards<LinksGroup, Content>(legalAndTechnicalLinksRaw, LinksGroupDeckConfig)
const socialMediaLinks = useMappedDeckCards<SocialMediaLink, Content>(socialMediaLinksRaw, SocialMediaLinkDeckConfig)

const footerImage = useImageElementContent<Content>('footer_image') as ImageContent
const footerText = useInputboxElementContent<Content>('footer_text') as InputBoxContent

provide(footerImageKey, {
	footerImage,
	footerText,
})

provide(linksGroupKey, {
	linksGroupAccountTitle,
	linksGroupCustomerCareTitle,
	linksGroupCompanyTitle,
	accounts,
	customerCares,
	companyCares,
})

provide(siteInfoKey,{
	copyrightNotice,
	contactUsTitle,
	contactUsTelephone,
	contactUsMail,
	legalAndTechnicalLinks,
	socialMediaLinks,
})

const title = useTextElementDesign<Design>('title') as TextDesignData
const link = useTextElementDesign<Design>('link') as TextDesignData
const footerTextDesign = useTextElementDesign<Design>('footer_text') as TextDesignData
const background = useBackgroundElementDesign<Design>('background') as BackgroundDesignData

provide(footerDesignKey, {
	title,
	link,
	background,
	footerTextDesign,
})

const isLinksGroup = useToggleElementDesign<Design>('isLinksGroup') as ToggleDesignData
const isContactUs = useToggleElementDesign<Design>('isContactUs') as ToggleDesignData
const isLegalAndTechnicalLinks = useToggleElementDesign<Design>('isLegalAndTechnicalLinks') as ToggleDesignData
const isSocialMediaLinks = useToggleElementDesign<Design>('isSocialMediaLinks') as ToggleDesignData
const isFooterImageAndText = useToggleElementDesign<Design>('isFooterImageAndText') as ToggleDesignData

provide(isElementsVisibleDesignKey,{
	isLinksGroup,
	isContactUs,
	isLegalAndTechnicalLinks,
	isSocialMediaLinks,
	isFooterImageAndText,
})
</script>

<style scoped lang="scss">

</style>
