import { TemplateCategoriesList } from '@lightspeed/crane-api'

export default {
	metadata: {
		name: 'Atelier',
		description: 'Apparel · Neutral · Modern',
		categories: [TemplateCategoriesList.apparel_footwear],
		preview_url: 'https://atelier-template.company.site/',
		cover_image: {
			set: {
				ORIGINAL: {
					url: 'template_cover_image.png',
				},
			},
		},
	},
	header: {
		type: 'custom',
		id: 'store-header',
	},
	footer: {
		type: 'custom',
		id: 'clothes-footer',
	},
} 
