<script setup lang="ts">
  import Wavesurfer from './widgets/Wavesurfer.vue'

  const props = defineProps<{
    colorCursor:   string,
    colorProgress: string,
    colorWave:     string,
    filepath:      string,
    label:         string,
    letter:        string,
  }>()
</script>

<template>
  <div class="soundpanel-item">
    <div class="letter"><span>{{  props.letter }}</span></div>
    <div class="label">{{ props.label }}</div>
    <div class="waveform">
      <Wavesurfer
        :height=30
        :width=80
        :cursorColor=props.colorCursor
        :progressColor=props.colorProgress
        :waveColor=props.colorWave
        :url=props.filepath
      />
    </div>
  </div>
</template>

<style scoped>
  .soundpanel-item {
    align-items: center;
    display: flex;
    border: 1px solid #333333;
    padding: 5px;

    .letter {
      background: #00ff;
      border-radius: 10%;
      height: 24px;
      margin-right: 8px;
      width: 24px;
    }

    .label {
      text-align: left;
      width: 60px;
    }
  }
</style>
