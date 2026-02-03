import ContentSettings from './settings/content.ts'
import DesignSettings from './settings/design.ts'

export type Content = InferContentType<typeof ContentSettings>;
export type Design = InferDesignType<typeof DesignSettings>;
