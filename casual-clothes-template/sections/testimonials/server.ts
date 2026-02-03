import { createVueServerApp } from '@lightspeed/crane'
import Testimonials from './Testimonials.vue'
import { Content, Design } from './type.ts'

export default createVueServerApp<Content, Design>(Testimonials)
