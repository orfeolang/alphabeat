<script setup lang="ts">
  import { ref } from 'vue'
  import Toggle from './Toggle.vue'

  const emit = defineEmits(['update:modelValue'])

  interface Props {
    errors?: Array<string>
    hasInputVisibilityToggle?: boolean
    id: string
    label: string
    maxlength?: string
    modelValue: string
    notes?: Array<string>
    optional?: boolean
    placeholder?: string
    theme?: string
    type?: 'password'|'text'
  }

  const {
    errors = [],
    hasInputVisibilityToggle = false,
    id,
    label,
    maxlength,
    modelValue,
    notes,
    optional = false,
    placeholder,
    theme = 'dark',
    type = 'text',
  } = defineProps<Props>()

  const inputType = ref(type)

  let isInputVisibilityToggled = inputType.value === 'text'

  const toggleInputVisibility = () => {
    isInputVisibilityToggled = ! isInputVisibilityToggled
    inputType.value = inputType.value === 'text'
      ? 'password'
      : 'text'
  }
</script>

<template>
  <div :class="[theme, { hasError: errors.length > 0 }]">
    <label :for=id>
      <span class="label">
        {{ label }}
        <span v-if="optional" class="optional">(optional)</span>
      </span>
      <span v-if="notes" class="notes">
        <template v-for="(note, i) in notes" :key=i>
          <span v-if="i > 0" class="separator"> | </span>
          <span class="note">{{ note }}</span>
        </template>
      </span>
    </label>
    <div class="input-wrapper">
      <input
        :id=id
        :maxlength=maxlength
        :placeholder=placeholder
        :type=inputType
        :value=modelValue
        @input="$emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value
        )"
      />
      <Toggle
        v-if=hasInputVisibilityToggle
        class="input-visibility-toggle"
        iconToggled="icon-eye"
        iconUntoggled="icon-eye-off"
        :isToggled=isInputVisibilityToggled
        @click=toggleInputVisibility
      />
    </div>
    <div class="errors" v-for="(error, i) in errors" :key=i>
      <div>{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
  label {
    align-items: baseline;
    display: flex;
    justify-content: space-between;

    .optional {
      color: #ffff0099;
      font-size: 12px;
    }

    .notes {
      color: #555;
      font-size: 14px;
    }
  }

  .input-wrapper {
    display: flex;
    position: relative;

    input {
      border: 1px solid #222;
      display: inline-block;
      margin-top: 3px;
      padding: 15px;
      width: 100%;
    }

    input:focus {
      outline: none;
    }

    input::placeholder {
      color: #333333;
    }

    input::-webkit-caps-lock-indicator,
    input::-webkit-textfield-decoration-container {
      visibility: hidden;
    }

    .input-visibility-toggle {
      font-size: 24px;
      position: absolute;
      right: 20px;
      top: 18px;
    }
  }

  div.errors div {
    color: #ff0000;
    font-size: 14px;
    margin-left: 10px;
  }

  div.dark {
    input {
      background: #101010;
      color: #ffffff;
    }

    .separator {
      color: #555555;
    }
  }
</style>
