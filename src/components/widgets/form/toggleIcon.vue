<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    iconToggled: string
    iconUntoggled: string
    isToggled: boolean
  }>()

  const iconClass = computed(() =>
    props.isToggled ? props.iconToggled : props.iconUntoggled
  )
</script>

<template>
  <span :class=iconClass></span>
</template>

<style scoped>
  span {
    cursor: pointer;
  }
</style>
