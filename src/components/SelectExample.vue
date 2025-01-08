<script setup lang="ts">
  import Select from './widgets/Select.vue'
  import { ref } from 'vue'

  const selectedInput = ref('')

  const options = ['Go', 'Javascript', 'PHP']

  function inputSelected(selected: string) {
    selectedInput.value = selected
  }
</script>

<template>
  <div>
    <Select
      :options=options
      @input="inputSelected"
    />
    {{ selectedInput }}
  </div>
</template>
