<script setup lang="ts">
const colorMode = useColorMode()

const setLightMode = () => (colorMode.preference = 'light')
const setDarkMode = () => (colorMode.preference = 'dark')
const setSystemMode = () => (colorMode.preference = 'system')
</script>

<template>
  <div class="theme-switcher">
    <button
        class="theme-button"
        :class="{ active: colorMode.preference === 'light' }"
        @click="setLightMode">
      ☀️
    </button>
    <button
        class="theme-button"
        :class="{ active: colorMode.preference === 'dark' }"
        @click="setDarkMode">
      🌙
    </button>
    <button
        class="theme-button"
        :class="{ active: colorMode.preference === 'system' }"
        @click="setSystemMode">
      💻
    </button>
  </div>
</template>

<style scoped lang="scss">
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 auto;

  .theme-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-secondary);
    color: var(--text-secondary);
    border: none;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      background-color: var(--background-hover);
      color: var(--text);
      transform: scale(1.2);
    }

    &.active {
      background-color: $primary-dark;
      border-radius: $border-radius-large;
    }
  }
}
</style>