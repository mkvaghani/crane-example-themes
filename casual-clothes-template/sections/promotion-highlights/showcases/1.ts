export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'promotion_highlights_preview.png',
			},
		},
	},
	blockName: '$label.blockName',
	content: {
		section_title: {
			type: 'INPUTBOX',
			text: '$label.section_title.default',
		},
		section_description: {
			type: 'TEXTAREA',
			text: '$label.section_description.default',
		},
		view_all_button: {
			type: 'BUTTON',
			buttonType: 'GO_TO_STORE_LINK',
			title: '$label.showcase_1.view_all_button.title',
			url: '$label.showcase_1.view_all_button.url',
		},
	},
	design: {
		section_title: {
			type: 'TEXT',
			font: 'inter',
			size: 32,
			bold: false,
			italic: false,
			color: '#000000',
			visible: true,
		},
		section_description: {
			type: 'TEXT',
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#000000',
			visible: true,
		},
		product_title: {
			type: 'TEXT',
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#000000',
			visible: true,
		},
		product_price: {
			type: 'TEXT',
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#000000',
			visible: true,
		},
		product_sale_price: {
			type: 'TEXT',
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#999999',
			visible: true,
		},
		background: {
			type: 'BACKGROUND',
			style: 'COLOR',
			color: '#FFFFFF',
		},
	},
} as const
