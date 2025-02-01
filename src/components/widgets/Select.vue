<!--
  Taken from:
  https://codesandbox.io/p/sandbox/custom-vuejs-select-component-8nqgd
-->

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  const emit = defineEmits(['input'])

  const props = defineProps({
    options:  { type: Array,  required: true },
    default:  { type: String, required: false, default: null },
    tabindex: { type: Number, required: false, default: 0 },
  })

  let selected = props.default
    ? props.default
    : props.options.length > 0
      ? props.options[0]
      : null

  const open = ref(false)

  onMounted(() => {
    emit('input', selected)
  })
</script>

<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          open = false;
          selected = option;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .custom-select {
    height: 47px;
    line-height: 47px;
    outline: none;
    position: relative;
    text-align: left;
    width: 100%;
  }

  .custom-select .selected {
    background-color: #0a0a0a;
    border: 1px solid #666666;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    padding-left: 1em;
    user-select: none;
  }

  .custom-select .selected.open {
    border: 1px solid #ad8225;
    border-radius: 6px 6px 0px 0px;
  }

  .custom-select .selected:after {
    border: 5px solid transparent;
    border-color: #fff transparent transparent transparent;
    content: "";
    height: 0;
    position: absolute;
    right: 1em;
    top: 22px;
    width: 0;
  }

  .custom-select .items {
    background-color: #0a0a0a;
    border-bottom: 1px solid #ad8225;
    border-left: 1px solid #ad8225;
    border-radius: 0px 0px 6px 6px;
    border-right: 1px solid #ad8225;
    color: #fff;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    z-index: 777;
  }

  .custom-select .items div {
    color: #fff;
    cursor: pointer;
    padding-left: 1em;
    user-select: none;
  }

  .custom-select .items div:hover {
    background-color: #ad8225;
  }

  .selectHide {
    display: none;
  }
</style>
