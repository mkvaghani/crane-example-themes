export default {
	eyebrow_text: {
		type: 'TEXT',
		label: '$label.eyebrow_text.design',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		sizes: [10, 12, 14, 16, 18, 20, 22],
		defaults: {
			font: 'inter',
			size: 16,
			bold: false,
			italic: false,
			color: '#FFFFFF',
			visible: true,
		},
	},
	hero_title: {
		type: 'TEXT',
		label: '$label.hero_title.design',
		colors: ['#000000', '#FFFFFF', '#F5F5F5', '#EEEEEE', '#CCCCCC', '#999999', '#666666', '#333333', '#1E1E21'],
		sizes: [20, 24, 28, 32, 36, 40, 44],
		defaults: {
			font: 'inter',
			size: 32,
			bold: false,
			italic: false,
			color: '#FFFFFF',
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
			color: '#FFFFFF',
			visible: true,
		},
	},
	overlay_background: {
		type: 'TOGGLE',
		label: '$label.overlay_background.label',
		description: '$label.overlay_background.description',
	},
} as const
