import { EditorTypes, InputBoxContent, TextAreaContent, SelectBoxContent } from '@lightspeed/crane'
import { createFieldConfig, field } from '../../../shared/composables'
import { BaseCard } from '../../../shared/types/type.ts'

interface TestimonialCard extends BaseCard {
	reviewedBy?: InputBoxContent;
	reviewText?: TextAreaContent;
	rating?: SelectBoxContent;
}

export const TestimonialDeckConfig = createFieldConfig({
	reviewedBy: field(EditorTypes.INPUTBOX, 'reviewedBy'),
	reviewText: field(EditorTypes.TEXTAREA, 'reviewText'),
	rating: field(EditorTypes.SELECTBOX, 'rating'),
})

export type {
	TestimonialCard,
}
