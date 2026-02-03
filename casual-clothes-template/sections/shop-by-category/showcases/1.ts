export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'shop_by_category_showcase_1_preview.png',
			},
		},
	},
	blockName: '$label.showcase_1.blockName',
	content: {
		section_title: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.section_title.text',
		},
		section_description: {
			type: 'TEXTAREA',
			text: '$label.showcase_1.section_description.text',
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
		category_text: {
			type: 'TEXT',
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#000000',
			visible: true,
		},
		background: {
			type: 'BACKGROUND',
			style: 'COLOR',
			color: '#FFFFFF',
		},
	},
} as const
