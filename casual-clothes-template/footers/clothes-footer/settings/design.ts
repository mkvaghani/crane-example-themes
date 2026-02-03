export default {
	title: {
		type: 'TEXT',
		label: '$label.title.design',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		sizes: [10, 12, 14, 16, 18, 20, 22],
		defaults: {
			font: 'inter',
			size: 16,
			bold: true,
			italic: false,
			color: '#1E1E21',
			visible: true,
		},
	},
	link: {
		type: 'TEXT',
		label: '$label.link.design',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		sizes: [10, 12, 14, 16, 18, 20, 22],
		defaults: {
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#1E1E21',
			visible: true,
		},
	},
	background:{
		type: 'BACKGROUND',
		label: '$label.section_background.label',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		defaults: {
			style: 'COLOR',
			color: '#FFFFFF',
		},
	},
	isLinksGroup: {
		type: 'TOGGLE',
		label: '$label.isLinksGroup.label',
		description: '$label.isLinksGroup.description',
		defaults: {
			enabled: true,
		},
	},
	isContactUs: {
		type: 'TOGGLE',
		label: '$label.isContactUs.label',
		description: '$label.isContactUs.description',
		defaults: {
			enabled: true,
		},
	},
	isLegalAndTechnicalLinks: {
		type: 'TOGGLE',
		label: '$label.isLegalAndTechnicalLinks.label',
		description: '$label.isLegalAndTechnicalLinks.description',
		defaults: {
			enabled: true,
		},
	},
	isSocialMediaLinks: {
		type: 'TOGGLE',
		label: '$label.isSocialMediaLinks.label',
		description: '$label.isSocialMediaLinks.description',
		defaults: {
			enabled: true,
		},
	},
	isFooterImageAndText: {
		type: 'TOGGLE',
		label: '$label.isFooterImageAndText.label',
		description: '$label.isFooterImageAndText.description',
		defaults: {
			enabled: true,
		},
	},
	footer_text: {
		type: 'TEXT',
		label: '$label.footer_text.design',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		sizes: [4, 6, 8, 10, 12, 14, 16],
		defaults: {
			font: 'inter',
			size: 10,
			bold: false,
			italic: false,
			color: '#EEE',
			visible: true,
		},
	},
} as const
