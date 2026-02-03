import { computed, ComputedRef } from 'vue'
import { Card, EditorTypes, useDeckElementContent } from '@lightspeed/crane'
import { BaseCard } from '../../types/type'

type FieldConfig = {
	type: EditorTypes;
	fieldName: string;
};

type FieldMapping = Record<string, FieldConfig>;

type UseMappedDeckCardsOptions<T> = {
	filterFn?: (item: T) => boolean;
	filterEmptyContent?: boolean;
};

/**
 * Maps deck cards to typed objects with reactive references
 * 
 * This composable simplifies working with Crane deck elements by automatically
 * mapping raw deck cards to strongly-typed objects with reactive references.
 * 
 * @template T - The target type extending BaseCard
 * @template Content - The section content type
 * 
 * @param deckContent - Raw deck content from useDeckElementContent
 * @param fieldMapping - Configuration mapping output fields to deck field names and types
 * @param options - Optional configuration object
 * @param options.filterFn - Custom filter function to exclude cards
 * @param options.filterEmptyContent - Automatically filter out cards with empty content (hasContent === false)
 * 
 * @returns Computed ref with mapped and typed cards
 * 
 * @example
 * ```typescript
 * // Define config
 * const CategoryDeckConfig = createFieldConfig({
 *   text: field(EditorTypes.TEXTAREA, 'image_text'),
 *   content: field(EditorTypes.IMAGE, 'image_content'),
 *   link: field(EditorTypes.INPUTBOX, 'image_link'),
 * })
 * 
 * // Use in component
 * const imagesRaw = useDeckElementContent<Content>('categories')
 * const categories = useMappedDeckCards<CategoryCard, Content>(
 *   imagesRaw,
 *   CategoryDeckConfig,
 *   { filterEmptyContent: true }
 * )
 * ```
 */
export function useMappedDeckCards<
	T extends BaseCard,
	Content
>(
	deckContent: ReturnType<typeof useDeckElementContent<Content>>,
	fieldMapping: FieldMapping,
	options?: UseMappedDeckCardsOptions<T>,
): ComputedRef<T[]> {
	return computed(() => {
		if (!deckContent?.hasContent || !deckContent?.cards) {
			return []
		}

		let mapped = deckContent.cards.map((card: Card) => {
			const result: Record<string, unknown> = {}

			// Take config and populate card
			for (const [key, config] of Object.entries(fieldMapping)) {
				result[key] = deckContent.getReactiveRef(
					card,
					config.type,
					config.fieldName,
				)
			}

			// Remove when Card would have id in base type
			result.id = ((card as unknown) as { id: number }).id

			return result as T
		})

		// Automatically filter out cards with empty content
		if (options?.filterEmptyContent) {
			mapped = mapped.filter((item: T) => {
				const hasContentProp = 'content' in item && item.content && typeof item.content === 'object' && 'hasContent' in item.content
				return !hasContentProp || (item.content as { hasContent: boolean }).hasContent
			})
		}

		// Apply custom filter function
		return options?.filterFn ? mapped.filter(options.filterFn) : mapped
	})
}

/**
 * Helper function to create a field configuration for deck mapping
 * 
 * @param type - The editor type (IMAGE, TEXTAREA, INPUTBOX, etc.)
 * @param fieldName - The field name as defined in settings/content.ts
 * @returns Field configuration object
 * 
 * @example
 * ```typescript
 * const config = {
 *   text: field(EditorTypes.TEXTAREA, 'image_text'),
 *   image: field(EditorTypes.IMAGE, 'image_content'),
 * }
 * ```
 */
export const field = (type: EditorTypes, fieldName: string): FieldConfig => ({
	type,
	fieldName,
})

/**
 * Helper function to create a typed field configuration
 * 
 * Provides better type inference for field mappings
 * 
 * @template T - Record type of field configurations
 * @param config - Field configuration object
 * @returns The same config with proper typing
 * 
 * @example
 * ```typescript
 * export const CategoryDeckConfig = createFieldConfig({
 *   text: field(EditorTypes.TEXTAREA, 'image_text'),
 *   content: field(EditorTypes.IMAGE, 'image_content'),
 *   link: field(EditorTypes.INPUTBOX, 'image_link'),
 * })
 * ```
 */
export const createFieldConfig = <T extends Record<string, FieldConfig>>(config: T): T => config
