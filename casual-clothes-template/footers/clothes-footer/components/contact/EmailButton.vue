<template>
	<a
		v-if="email"
		v-text="email"
		@click.prevent="performAction"
		:style="linkStyle">
	</a>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { footerDesignKey } from '../../types/type.ts'
import { createTextStyle } from '../../../../shared/utils'

interface IEmailButtonProps{
  performAction: () => void;
  email:string | null
}
defineProps<IEmailButtonProps>()

const siteDesign = inject(footerDesignKey)

const linkStyle = computed(() => createTextStyle(siteDesign?.link))
</script>

<style scoped>
a {
  position: relative;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  padding-bottom: 2px;
}

a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}
</style>
