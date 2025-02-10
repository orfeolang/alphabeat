<script setup lang="ts">
  import Tooltip from './Tooltip.vue'
  import Icon from './Icon.vue'
  import { isNumberWithinBounds, round } from '../../helpers/number'
  import { ref } from 'vue'

  const emit = defineEmits(['update:modelValue'])

  interface Props {
    max? : number
    min?: number
    modelValue?: number
    numDecimals?: number
    showTooltip?: boolean
    step?: number
    tooltip?: string
  }

  const {
    max,
    min,
    modelValue = 0,
    numDecimals = 1,
    showTooltip = false,
    step = 0.1,
    tooltip,
  } = defineProps<Props>()

  const inputStateRef = ref(modelValue)

  const stepper = (step:number) => {
    const tentativeNewModelValue = round(
      inputStateRef.value + step, numDecimals
    )
    if (isNumberWithinBounds(tentativeNewModelValue, min, max)) {
      inputStateRef.value = tentativeNewModelValue
      emit('update:modelValue', inputStateRef.value)
    }
  }
</script>

<template>
  <div class="input-number">
    <Tooltip :text=tooltip :hide=" ! showTooltip">
      <div class="content">
        <div
          class="number"
          type="string"
        >{{ inputStateRef }}</div>
        <div class="icons">
          <Icon
            class="icon--add"
            name="add"
            type="button"
            @click=stepper(step)
          />
          <Icon
            class="icon--subtract"
            name="subtract"
            type="button"
           @click=stepper(-step)
          />
        </div>
      </div>
    </Tooltip>
  </div>
</template>

<style scoped>
  .content {
    align-items: center;
    background: #333;
    color: #ffffff;
    display: flex;

    .number {
      align-items: center;
      display: flex;
      font-size: 16px;
      height: 24px;
      overflow: hidden;
      padding: 5px;
      white-space: nowrap;
      width: 35px;
    }

    .icons {
      align-items: center;
      display: flex;

      .icon {
        color: #ff0000;

        &.click-color:active {
          color: #fff;
        }
      }

      .icon--subtract {
         margin-left: -3px;
       }
    }
  }
</style>
