<script setup lang="ts">
  const props = defineProps({
    text:  { type: String, required: true },
    class: { type: String, required: false, default: 'primary' },
  })
</script>

<template>
  <button :class=props.class>{{ props.text }}</button>
</template>

<style scoped>
  button {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    opacity: 0.85;
    padding: 15px;
    transition: 0.50s;
    width: 100%;
  }

  button:hover {
    opacity:1;
  }

  button.primary {
    background: #04AA6D;
    color: #ffffff;
  }
</style>
