<template>
	<div class="custom-bottom-bar">
		<button class="account-button" @click="goToAccount">
			<Icon size="small" color="white" />
			<span class="account-text">Go to Account</span>
		</button>
	</div>
</template>

<script setup lang="ts">
import Icon from '../../components/Icon.vue'

const goToAccount = () => {
	// eslint-disable-next-line
  const storefrontApi = (window as any)?.Ecwid;

	storefrontApi?.OnAPILoaded.add(() => {
		storefrontApi?.openPage('account')
	})
}
</script>

<style lang="scss" scoped>
.custom-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
  pointer-events: none;
  z-index: 1000;

  .account-button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #333;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin: 0 auto;
    pointer-events: auto;
    min-width: 160px;
    justify-content: center;

    &:hover {
      background: #555;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .account-text {
      white-space: nowrap;
    }
  }
}
</style>
