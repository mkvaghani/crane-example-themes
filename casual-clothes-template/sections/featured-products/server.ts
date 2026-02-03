import { createVueServerApp } from '@lightspeed/crane'
import { Content, Design } from './type.ts'
import FeaturedProducts from './FeaturedProducts.vue'

export default createVueServerApp<Content, Design>(FeaturedProducts)
