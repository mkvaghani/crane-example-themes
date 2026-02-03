import { createVueServerApp } from '@lightspeed/crane'
import { Content, Design } from './type.ts'
import ShopByCategory from './ShopByCategory.vue'

export default createVueServerApp<Content, Design>(ShopByCategory)
