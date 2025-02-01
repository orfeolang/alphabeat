<script setup lang="ts">
  interface Props {
    label: string
    theme?: string
  }

  const {
    label,
    theme = 'dark',
  } = defineProps<Props>()
</script>

<template>
  <div class="button" :class=theme>{{ label }}</div>
</template>

<style scoped>
  .button {
    cursor: pointer;
    font-size: 20px;
    letter-spacing: 1px;
    opacity: 0.85;
    padding: 15px;
    text-align: center;
    transition: 0.4s;

    &.dark {
      background-image: linear-gradient(
        to right, #04AA6D, #222244
      );
      color: #ffffff;
    }

    &.monochrome {
      background: #000000;
      color: #fff;

      &:hover {
        color: crimson;
      }
    }
  }

  .button:hover {
    opacity: 1;
  }
</style>
