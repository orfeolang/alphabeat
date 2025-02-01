<script setup lang="ts">
  import Tooltip from './Tooltip.vue'
  import { iconNameType } from '../../helpers/type'
  import { computed } from 'vue'

  const emit = defineEmits(['click', 'update:modelValue'])

  interface Props {
    colorActive?: boolean
    colorHover?: boolean
    disabled?: boolean
    modelValue?: boolean
    name: iconNameType
    nameWhenToggled?: iconNameType
    showTooltip?: boolean
    tooltip?: string
    type?: 'button' | 'static' | 'toggle'
  }

  const {
    colorActive = true,
    colorHover = true,
    disabled = false,
    modelValue = false,
    name,
    nameWhenToggled,
    showTooltip = false,
    tooltip,
    type = 'static',
  } = defineProps<Props>()

  const nameWhenToggledRef = computed(() =>
    nameWhenToggled ?? name
  )

  const tooltipRef = computed(() =>
    tooltip ?? name
  )

  const iconClassRef = computed(() =>
    'icon-' + (modelValue ? nameWhenToggledRef.value : name)
  )

  const classObjectRef = computed(() => ({
    [iconClassRef.value]: true,
    clickable: ! disabled,
    disabled: disabled,
    'click-color': colorActive && ! disabled && type === 'button',
    'hover-color': colorHover && ! disabled,
    'toggled-color': colorActive && type === 'toggle' && modelValue,
  }))

  const click = () => {
    if ( ! disabled) {
      if (type === 'button') {
        emit('click')
      }
      else if (type === 'toggle') {
        emit('update:modelValue', ! modelValue)
      }
    }
  }
</script>

<template>
  <Tooltip :text=tooltipRef :hide="! showTooltip">
    <div class="icon" :class=classObjectRef @click=click></div>
  </Tooltip>
</template>

<style scoped>
  .icon {
    font-size: 32px;

    &.clickable {
      cursor: pointer;
    }

    &.disabled {
      opacity: 0.3;
    }

    &.click-color:active {
      color: green;
    }

    &.hover-color:hover {
      opacity: 0.8;
    }

    &.toggled-color {
      color: green;
    }
  }
</style>
