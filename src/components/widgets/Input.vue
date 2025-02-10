<script setup lang="ts">
  import Icon from './Icon.vue'
  import { ref, watch } from 'vue'

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
    type?: 'password' | 'text'
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

  const toggleInputVisibilityStateRef = ref(false)

  watch(toggleInputVisibilityStateRef, () => {
    inputType.value = toggleInputVisibilityStateRef.value
      ? type === 'password' ? 'text' : type
      : 'password'
  })
</script>

<template>
  <div class="input" :class="[theme, { hasError: errors.length > 0 }]">
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
      <Icon
        v-if=hasInputVisibilityToggle
        class="input-visibility-toggle"
        nameWhenToggled="view"
        name="view--off"
        :size=32
        type="toggle"
        v-model=toggleInputVisibilityStateRef
      />
    </div>
    <div class="errors" v-for="(error, i) in errors" :key=i>
      <div class="error">{{ error }}</div>
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
      position: absolute;
      right: 20px;
      top: 15px;
    }
  }

  .errors .error {
    color: #ff0000;
    font-size: 14px;
    margin-left: 10px;
  }

  .dark {
    input {
      background: #101010;
      color: #ffffff;
    }

    .separator {
      color: #555555;
    }
  }
</style>
