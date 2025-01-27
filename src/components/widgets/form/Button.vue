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
  <div :class=theme>{{ label }}</div>
</template>

<style scoped>
  div {
    cursor: pointer;
    font-size: 20px;
    letter-spacing: 1px;
    opacity: 0.85;
    padding: 15px;
    text-align: center;
    transition: 0.50s;
  }

  div:hover {
    opacity:1;
  }

  div.dark {
    background-image: linear-gradient(
      to right,
      #04AA6D,
        #222244
    );
    color: #ffffff;
  }
</style>
