<script setup lang="ts">
  import Button from './Button.vue'

  const emit = defineEmits(['close'])

  defineProps<{
    isOpen: boolean
  }>()

  const close = () => emit('close')
</script>

<template>
  <transition name="modal-animation">
    <div v-show=isOpen class="modal">
      <transition name="modal-animation-inner">
        <div v-show=isOpen class="modal-inner">
          <span
            class="icon-x-circle"
            @click=close
          ></span>
          <slot />
          <Button
            class="button"
            label="Close"
            theme="monochrome"
            @click=close
          />
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
  .modal-animation-enter-active,
  .modal-animation-leave-active {
    transition: opacity .3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-animation-enter-from,
  .modal-animation-leave-to {
    opacity: 0;
  }

  .modal-animation-inner-enter-active {
    transition: all .3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }

  .modal-animation-inner-leave-active {
    transition: all .3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-animation-inner-enter-from,
  .modal-animation-inner-leave-to {
    transform: scale(0.8);
  }

  .modal-animation-inner-enter-from {
    opacity: 0;
  }

  .modal {
    align-items: center;
    background: #222240cc;
    color: #000000;
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;

    .modal-inner {
      background-color: #ffffff;
      height: 80%;
      max-width: 800px;
      overflow-y: scroll;
      padding: 32px 30px;
      position: relative;
      scrollbar-color: red orange;
      scrollbar-width: thin;
      width: 80%;

      [class^='icon-'], [class*=' icon-'] {
        cursor: pointer;
        float: right;
        font-size: 28px;
        position: sticky;
        top: 0;

        &:hover {
          color: crimson;
        }
      }
    }
  }
</style>
