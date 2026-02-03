export default {
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
	reviewer_name: {
		type: 'TEXT',
		label: '$label.reviewer_name.design',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		sizes: [12, 14, 16, 18, 20, 22, 24],
		defaults: {
			font: 'inter',
			size: 18,
			bold: true,
			italic: false,
			color: '#000000',
			visible: true,
		},
	},
	review_text: {
		type: 'TEXT',
		label: '$label.review_text.design',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		sizes: [10, 12, 14, 16, 18, 20, 22],
		defaults: {
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#333333',
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
} as const
