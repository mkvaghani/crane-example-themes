export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'preview.png',
			},
		},
	},
	blockName: '$label.showcase_1.blockName',
	content: {
		eyebrow_text: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.eyebrow_text',
		},
		product_image: {
			type: 'IMAGE',
			imageData: {
				set: {
					MOBILE_WEBP_LOW_RES: {
						url: 'product-image.png',
					},
					MOBILE_WEBP_HI_RES: {
						url: 'product-image.png',
					},
					WEBP_LOW_RES: {
						url: 'product-image.png',
					},
					WEBP_HI_2X_RES: {
						url: 'product-image.png',
					},
				},
				borderInfo: {},
			},
		},
		overlay_headline: {
			type: 'TEXTAREA',
			text: '$label.showcase_1.overlay_headline',
		},
		description: {
			type: 'TEXTAREA',
			text: '$label.showcase_1.description',
		},
		cta_button: {
			type: 'BUTTON',
			title: '$label.showcase_1.cta_button.title',
			buttonType: 'GO_TO_STORE_LINK',
		},
	},
	design: {
		section_background: {
			type: 'BACKGROUND',
			style: 'COLOR',
			color: '#FFFFFF',
		},
		eyebrow_text: {
			type: 'TEXT',
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#000000',
			visible: true,
		},
		overlay_headline: {
			type: 'TEXT',
			font: 'inter',
			size: 128,
			bold: false,
			italic: false,
			color: '#FFFFFF',
			visible: true,
		},
		description: {
			type: 'TEXT',
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#000000',
			visible: true,
		},
		cta_button: {
			type: 'BUTTON',
			font: 'inter',
			appearance: 'SOLID',
			size: 'MEDIUM',
			shape: 'RECTANGLE',
			color: '#000000',
		},
	},
} as const
