<script setup lang="ts">
  interface Props {
    hide?: boolean
    text: string
  }

  const {
    hide = false,
    text
  } = defineProps<Props>()
</script>

<template>
  <div class="tooltip-wrapper">
    <div class="tooltip" v-if="! hide">{{ text }}</div>
    <slot />
  </div>
</template>

<style scoped>
  .tooltip-wrapper {
    display: inline-block;
    position: relative;
  }

  .tooltip-wrapper:hover .tooltip,
  :slotted(*):focus + .tooltip {
    visibility: visible;
  }

  .tooltip {
    background: #000;
    bottom: 120%;
    color: #ffffff;
    font-size: 16px;
    left: -20%;
    padding: 5px 8px;
    position: absolute;
    text-align: center;
    width: auto;
    white-space: nowrap;
    visibility: hidden;
    z-index: 1;
  }
</style>
