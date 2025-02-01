<script setup lang="ts">
  import Icon from './widgets/Icon.vue'
  import Select from './widgets/Select.vue'
  import Soundlibrary from './Soundlibrary.vue'
  import { ref } from 'vue'

  const examples =['-', 'baby beats', 'Eons of truth', 'gamelan']
  const selectedExample = ref(examples[0])

  const selectExample = (selected: string) => (
    selectedExample.value = selected
  )

  const isLoopingRef = ref(false)
  const isPlayingRef = ref(false)
  const isPausedRef = ref(false)
  const isStopDisabledRef = ref(true)
  const isPausedDisabledRef = ref(true)
  const isPlayDisabledRef = ref(false)

  const handleStop = () => {
    isPlayingRef.value = false
    isPausedRef.value = false
    isPausedDisabledRef.value = true
    isStopDisabledRef.value = true
    isPlayDisabledRef.value = false
  }

  const handlePlay = () => {
    isPausedDisabledRef.value = false
    isStopDisabledRef.value = false
    isPlayDisabledRef.value = true
    isPausedRef.value = false
  }

  const handlePause = () => {
    if (isPausedRef.value) {
      isPlayingRef.value = false
      isPlayDisabledRef.value = false
    }
    else {
      isPlayingRef.value = true
      isPlayDisabledRef.value = true
    }
  }
</script>

<template>
  <div class="container">
    <div class="editor-container">
      <div class="controls">
        <div class="icons">
          <Icon
            name="cpu"
            :showTooltip=true
            tooltip="compile"
            type="button"
          />
          <Icon
            name="save"
            :showTooltip=true
            tooltip="save"
            type="button"
          />
          <Icon
            name="trash-2"
            :showTooltip=true
            tooltip="clear"
            type="button"
          />
        </div>
        <Select
          class="select"
          :default=selectedExample
          :options=examples
          @input=selectExample
        />
      </div>
      <div class="textarea editor" contenteditable="true">editor</div>
    </div>
    <div class="monitor-container">
      <div class="controls">
        <div class="icons">
          <Icon
            name="play"
            :disabled=isPlayDisabledRef
            :showTooltip=true
            tooltip="play"
            type="toggle"
            v-model=isPlayingRef
            @click=handlePlay
          />
          <Icon
            :disabled=isStopDisabledRef
            name="square"
            :showTooltip=true
            tooltip="stop"
            type="button"
            @click=handleStop
          />
          <Icon
            :disabled=isPausedDisabledRef
            name="pause"
            :showTooltip=true
            tooltip="pause"
            type="toggle"
            v-model=isPausedRef
            @click=handlePause
          />
          <Icon
            name="rotate-cw"
            :showTooltip=true
            tooltip="loop"
            type="toggle"
            v-model=isLoopingRef
          />
        </div>
      </div>
      <div class="textarea monitor" contenteditable="true">monitor</div>
    </div>
    <Soundlibrary />
  </div>
</template>

<style scoped>
  .editor-container .controls {
    align-items: center;
    display: flex;
    justify-content: space-between;

    .select {
      margin-bottom: 3px;
      width: 200px;
    }
  }

  .container {
    display: flex;
  }

  .textarea {
    background: #000;
    border: 1px solid #000;
    color: #ccc;
    height: auto;
    margin-right: 10px;
    padding: 20px;
  }

  .editor {
    width: 800px;
  }

  .monitor {
    width: 600px;
  }

  [class^='icon-'], [class*=' icon-'] {
    font-size: 24px;
    padding: 8px;
  }
</style>
