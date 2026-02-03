/// <reference types="@lightspeed/crane-api/types" />

declare module '*.svg?raw' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}
