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
      class="selection"
      :class="{ open: isOpenRef }"
      @click="isOpenRef = ! isOpenRef"
    >
      {{ selectedRef }}
      <Icon name="caret--down" />
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
    height: 47px;
    line-height: 47px;
    outline: none;
    position: relative;
    text-align: left;
    width: 100px;

    .selection {
      align-items: center;
      background-color: #0a0a0a;
      border: 1px solid #666666;
      border-radius: 6px; border-radius: 0;
      color: #fff;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      padding: 0 5px 0 16px;
      user-select: none;

      &.open {
        border: 1px solid #ad8225;
      }
    }

    .items {
      background-color: #0a0a0a;
      border-bottom: 1px solid #ad8225;
      border-left: 1px solid #ad8225;
      border-right: 1px solid #ad8225;
      color: #fff;
      left: 0;
      overflow: hidden;
      position: absolute;
      right: 0;
      z-index: 1;

      &.hide {
        display: none;
      }

      .item {
        color: #fff;
        cursor: pointer;
        padding-left: 1em;
        user-select: none;

        &:hover {
          background-color: #333;
        }
      }
    }
  }
</style>
