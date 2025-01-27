<script setup lang="ts">
  const emit = defineEmits(['update:modelValue'])

  /*
  interface Props {
    id?: string
    errors?: Array<string>
    maxlength?: string
    modelValue: string
    name?: string
    notes?: Array<string>
    optional?: boolean
    placeholder?: string
    theme?: string
    type?: string
  }
    */



  interface Props {
    errors?: Array<string>
    label: string
    modelValue: boolean
    theme?: string
  }

  const {
    errors = [],
    label,
    modelValue,
    theme = 'dark',
  } = defineProps<Props>()
</script>

<template>
  <div :class="[theme, {hasError: errors.length > 0}]">
    <label class="container">
      {{ label }}
      <input
        type="checkbox"
        :checked=modelValue
        @input="$emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).checked ? true : false
        )"
      />
      <span class="checkmark"></span>
    </label>
    <div class="errors" v-for="(error, i) in errors" :key=i>
      <div>{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
  /* Customize the label (the container). */
  .container {
    cursor: pointer;
    display: block;
    font-size: 16px;
    margin-bottom: 3px;
    padding-left: 35px;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox. */
  .container input {
    cursor: pointer;
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;
  }

  /* Create a custom checkbox. */
  .checkmark {
    background-color: #eee;
    height: 25px;
    left: 0;
    position: absolute;
    top: 0;
    width: 25px;
  }

  /* On mouse-over, add a grey background color. */
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background. */
  .container input:checked ~ .checkmark {
    background-color: #2196F3;
  }

  /* Create the checkmark/indicator (hidden when not checked). */
  .checkmark:after {
    content: '';
    display: none;
    position: absolute;
  }

  /* Show the checkmark when checked. */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator. */
  .container .checkmark:after {
    border: solid #ffffff;
    border-width: 0 3px 3px 0;
    height: 12px;
    left: 9px;
    top: 5px;
    width: 7px;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  div.errors div {
    color: #ff0000;
    font-size: 14px;
    margin-left: 10px;
  }
</style>
