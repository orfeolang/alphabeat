<script setup lang="ts">
  import Icon from './Icon.vue'
  import { ref, onMounted } from 'vue'
  const emit = defineEmits(['input'])

  interface Props {
    defaultOption?: string
    options: Array<String>
    tabindex?: number
  }

  const {
    defaultOption,
    options,
    tabindex = 0,
  } = defineProps<Props>()

  const selectedRef = ref(
    defaultOption
      ? defaultOption
      : options.length > 0
        ? options[0]
        : null
  )

  const isOpenRef = ref(false)

  onMounted(() => {
    emit('input', selectedRef.value)
  })
</script>

<template>
  <div class="select" :tabindex="tabindex" @blur="isOpenRef = false">
    <div
      class="selection-wrapper"
      :class="{ open: isOpenRef }"
      @click="isOpenRef = ! isOpenRef"
    >
      <div class="selection">{{ selectedRef }}</div>
      <Icon name="caret--down" :size=24 />
    </div>

    <div class="items" :class="{ 'hide': ! isOpenRef }">
      <div
        class="item"
        v-for="(option, i) of options"
        :key="i"
        @click="
          isOpenRef = false;
          selectedRef = option;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .select {
    font-size: 16px;
    height: 42px;
    line-height: 42px;
    outline: none;
    position: relative;
    text-align: left;
    width: 100%;

    .selection-wrapper {
      align-items: center;
      background: #0a0a0a;
      border: 1px solid #666666;
      color: #fff;
      cursor: pointer;
      display: flex;
      height: 42px;
      justify-content: space-between;
      padding: 0 5px 0 10px;
      user-select: none;

      &.open {
        border: 1px solid #ad8225;
      }
    }

    .items {
      background: #0a0a0a;
      border-bottom: 1px solid #ad8225;
      border-left: 1px solid #ad8225;
      border-right: 1px solid #ad8225;
      color: #fff;
      left: 0;
      overflow: hidden;
      position: absolute;
      right: 0;
      z-index: 3; /* To go over Wavesurfer. */

      &.hide {
        display: none;
      }

      .item {
        color: #fff;
        cursor: pointer;
        height: 42px;
        padding-left: 10px;
        user-select: none;

        &:hover {
          background-color: #333;
        }
      }
    }
  }
</style>
