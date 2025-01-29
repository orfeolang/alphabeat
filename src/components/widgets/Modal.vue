<script setup lang="ts">
  const emit = defineEmits(['close'])

  defineProps<{
    modalActive: boolean
  }>()

  const close = () => {
    emit('close')
  }
</script>

<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner">
          x
          <!-- Modal Content -->
          <slot />
          <button @click=close type="button">Close</button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scped>
</style>
