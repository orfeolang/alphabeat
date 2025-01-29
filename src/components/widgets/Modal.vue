<script setup lang="ts">
  import Button from '../widgets/form/Button.vue'

  const emit = defineEmits(['close'])

  defineProps<{
    isOpen: boolean
  }>()

  // This can go directly on the button...
  const close = () => {
    emit('close')
  }
</script>

<template>
  <transition name="modal-animation">
    <div v-show=isOpen class="modal">
      <transition name="modal-animation-inner">
          <div v-show=isOpen class="modal-inner">
            <span @click=close class="icon-cancel-circle"></span>
              <!-- Modal Content -->
              <slot />
              <Button
                class="button"
                label="Close"
                @click=close
                theme="monochrome"
              />
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
/*
  .button {
    text-align: center;
    width: 100px;
  }
*/

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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: #222240cc;
    color: #000000;

    .modal-inner {
      position: relative;
      max-width: 800px;
      width: 80%;

      height: 80%;
      overflow-y: scroll;
      scrollbar-color: red orange;
      scrollbar-width: thin;


      /*box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px;*/
      background-color: #ffffff;
      padding: 32px 30px;



      .icon-cancel-circle {
        position: sticky;
        top: 0;
        /*left: 740px;*/
        float: right;

       /* width: 16px;*/

        font-size: 24px;
        cursor: pointer;
        /*border:2px solid green;*/

        &:hover {
          color: crimson;
        }
      }

/*
      .modal-inner-content {
        padding: 20px;
      }
*/
    }
  }
</style>
