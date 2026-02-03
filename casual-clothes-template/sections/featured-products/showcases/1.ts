export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'featured-products-preview.png',
			},
		},
	},
	blockName: '$label.showcase_1.blockName',
	content: {
		section_title: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.section_title',
		},
		section_description: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.section_description',
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
		product_name: {
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
