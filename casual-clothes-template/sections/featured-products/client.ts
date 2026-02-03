import { createVueClientApp } from '@lightspeed/crane'
import { Content, Design } from './type.ts'
import FeaturedProducts from './FeaturedProducts.vue'

export default createVueClientApp<Content, Design>(FeaturedProducts)
