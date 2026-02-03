import { createVueClientApp } from '@lightspeed/crane'
import ShopByCategory from './ShopByCategory.vue'
import { Content, Design } from './type.ts'

export default createVueClientApp<Content, Design>(ShopByCategory)
