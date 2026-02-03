export default {
	section_title: {
		type: 'INPUTBOX',
		label: '$label.section_title.label',
		placeholder: '$label.section_title.placeholder',
		defaults: {
			text: '$label.section_title.default',
		},
	},
	section_description: {
		type: 'INPUTBOX',
		label: '$label.section_description.label',
		placeholder: '$label.section_description.placeholder',
		defaults: {
			text: '$label.section_description.default',
		},
	},
} as const
