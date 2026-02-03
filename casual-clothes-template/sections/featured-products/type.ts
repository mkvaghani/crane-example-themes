import ContentSettings from './settings/content'
import DesignSettings from './settings/design'

export type Content = InferContentType<typeof ContentSettings>
export type Design = InferDesignType<typeof DesignSettings>
