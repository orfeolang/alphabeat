<!-- Have inner model value -->
<script setup lang="ts">
  import Icon from './Icon.vue'
  import { ref, watch } from 'vue'

  const emit = defineEmits(['update:modelValue'])

  interface Props {
    errors?: Array<string>
    id: string,
    label?: string
    modelValue: boolean
  }

  const {
    errors = [],
    id,
    label,
    modelValue = false,
  } = defineProps<Props>()

  const isToggledRef = ref(modelValue)

  watch(isToggledRef, () => {
    emit('update:modelValue', isToggledRef.value)
  })
</script>

<template>
  <div :class="[{ hasError: errors.length > 0 }]">
    <label :for=id>
      <Icon
        :id=id
        name="checkbox"
        nameWhenToggled="checkbox--checked"
        type="toggle"
        v-model=isToggledRef
      />
      <span v-if="label" class="label">{{ label }}</span>
    </label>
    <div class="errors" v-for="(error, i) in errors" :key=i>
      <div>{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
  label {
    align-items: center;
    display:flex;
  }

  .errors div {
    color: #ff0000;
    font-size: 14px;
    margin-left: 10px;
  }
</style>
