import { EditorTypes, ImageContent, InputBoxContent, TextAreaContent } from '@lightspeed/crane'
import { createFieldConfig, field } from '../../../shared/composables'
import { BaseCard } from '../../../shared/types/type.ts'

interface CategoryCard extends BaseCard {
	text?: TextAreaContent;
	content?: ImageContent;
	link?: InputBoxContent;
}

export const CategoryDeckConfig = createFieldConfig({
	text: field(EditorTypes.TEXTAREA, 'image_text'),
	content: field(EditorTypes.IMAGE, 'image_content'),
	link: field(EditorTypes.INPUTBOX, 'image_link'),
})

interface Slide {
    id: number;
    image: string | null;
    text: string | null;
    image_link: string | null
}

export type {
	CategoryCard,
	Slide,
}
