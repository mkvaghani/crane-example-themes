export default {
	section_background: {
		type: 'BACKGROUND',
		label: '$label.section_background.label',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		defaults: {
			style: 'COLOR',
			color: '#FFFFFF',
		},
	},
	section_title: {
		type: 'TEXT',
		label: '$label.section_title.design',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		sizes: [20, 24, 28, 32, 36, 40, 44],
		defaults: {
			font: 'inter',
			size: 32,
			bold: false,
			italic: false,
			color: '#000000',
			visible: true,
		},
	},
	section_subtitle: {
		type: 'TEXT',
		label: '$label.section_subtitle.design',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		sizes: [10, 12, 14, 16, 18, 20, 22],
		defaults: {
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#000000',
			visible: true,
		},
	},
	gallery_item_username: {
		type: 'TEXT',
		label: '$label.gallery_item_username.design',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		sizes: [10, 12, 14, 16, 18, 20, 22],
		defaults: {
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#000000',
			visible: true,
		},
	},
} as const
