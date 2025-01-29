<script setup lang="ts">

  // Look into modelValue here...

  import { ref, onMounted } from 'vue'
  const emit = defineEmits(['input'])

  interface Props {
    toggled?: boolean
    onIconClass: string  // toggled icon class
    offIconClass: string // untoggledIconClass
  }

  const {
    toggled = false,
    onIconClass,
    offIconClass,
  } = defineProps<Props>()

  const isToggled = ref(toggled) // can we use reactive?

  onMounted(() => {
    emit('input', isToggled.value)
  })

  const onToggle = () => {
    isToggled.value = ! isToggled.value
    emit('input', isToggled.value);
  }
</script>

<template>


  <div @click=onToggle>

    <!-- use better way than this computed way... -->
    <span v-if="isToggled" :class=onIconClass></span>
    <span v-else :class=offIconClass></span>

  </div>


</template>

<style scoped>
  div {
    cursor: pointer;
  }
</style>
