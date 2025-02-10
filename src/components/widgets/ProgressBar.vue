<script setup lang="ts">
  import { constrainNumber } from '../../helpers/number'

  interface Props {
    progress?: number
  }

  const {
    progress = 0,
  } = defineProps<Props>()
</script>

<template>
  <div class="progress-bar">
    <div
      class="bar"
      :style="{ width: constrainNumber(progress, 0, 100) + '%' }"
    ></div>
  </div>
</template>

<style scoped>
  .progress-bar {
    background-color: grey;
    width: 100%;

    .bar {
      background-color: green;
      height: 30px;
      width: 0%;
    }
  }
</style>
