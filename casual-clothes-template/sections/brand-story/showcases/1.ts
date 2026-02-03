export default {
	showcaseId: '1',
	previewImage: {
		set: {
			ORIGINAL: {
				url: 'brand_story_preview.png',
			},
		},
	},
	blockName: '$label.showcase_1.blockName',
	content: {
		video_url: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.video_url',
		},
		section_title: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.section_title',
		},
		section_description: {
			type: 'TEXTAREA',
			text: '$label.showcase_1.section_description',
		},
		play_button_text: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.play_button_text',
		},
		pause_button_text: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.pause_button_text',
		},
		watch_video_text: {
			type: 'INPUTBOX',
			text: '$label.showcase_1.watch_video_text',
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
		play_button: {
			type: 'BUTTON',
			font: 'inter',
			appearance: 'SOLID',
			size: 'MEDIUM',
			shape: 'RECTANGLE',
			color: '#FFFFFF',
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
