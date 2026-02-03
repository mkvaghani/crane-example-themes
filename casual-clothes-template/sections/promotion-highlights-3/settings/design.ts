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
	cta_button: {
		type: 'BUTTON',
		label: '$label.cta_button.design',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		defaults: {
			appearance: 'SOLID',
			font: 'inter',
			size: 'MEDIUM',
			shape: 'RECTANGLE',
			color: '#000000',
			visible: true,
		},
	},
} as const
