<script setup lang="ts">
  import ToggleIcon from './toggleIcon.vue'

  const emit = defineEmits(['update:modelValue'])

  interface Props {
    id: string
    errors?: Array<string>
    label: string
    maxlength?: string
    modelValue: string
    notes?: Array<string>
    optional?: boolean
    placeholder?: string
    theme?: string
    type?: string
  }

  const {
    id,
    errors = [],
    label,
    maxlength,
    modelValue,
    notes,
    optional = false,
    placeholder,
    theme = 'dark',
    type = 'text',
  } = defineProps<Props>()





  import { ref } from 'vue'
  const visibleInput = ref(true)

  const onSeeToggle = () => {
    visibleInput.value = ! visibleInput.value
  }



</script>

<template>
  <div :class="[theme, {hasError: errors.length > 0}]">
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
        :type=type
        :value=modelValue
        @input="$emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value
        )"
      />
      <ToggleIcon
        class="eye-toggle"
        iconToggled="icon-eye-off"
        iconUntoggled="icon-eye"
        :isToggled=visibleInput
        @click="onSeeToggle"
      />
    </div>
    <div class="errors" v-for="(error, i) in errors" :key=i>
      <div>{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>

  .input-wrapper {
    position: relative;
    display: flex;

    .eye-toggle {
      position: absolute;
      top: 18px;
      right: 20px;
      font-size: 24px;
    }
  }

  label {
    align-items: baseline;
    display: flex;
    justify-content: space-between;

    .notes {
      font-size: 14px;
    }
  }

  input {
    display: inline-block;
    margin-top: 3px;
    padding: 15px;
    width: 100%;
    border: 1px solid #222;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: #333333;
  }

  .optional {
    font-size: 12px;
    color: #ffff0099;
  }

  .notes {
    color: #555;
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

    .hasError input {
      border: 1px solid #ff0000;
    }
  }
</style>
