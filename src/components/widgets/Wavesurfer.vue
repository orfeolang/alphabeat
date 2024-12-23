<script setup lang="ts">
  import { useTemplateRef, onMounted } from 'vue'
  import Wavesurfer from 'wavesurfer.js'

  const props = defineProps({
    width:         { type: Number, required: true },
    height:        { type: Number, required: true },
    colorCursor:   { type: String, required: true },
    colorProgress: { type: String, required: true },
    colorWave:     { type: String, required: true },
    url:           { type: String, required: true },
  })

  const container = useTemplateRef('container')

  onMounted(() => {
    const el = container.value as HTMLElement
    const wavesurfer = Wavesurfer.create({
      container:     el,
      hideScrollbar: true,
      interact:      false,
      width:         props.width,
      height:        props.height,
      cursorColor:   props.colorCursor,
      progressColor: props.colorProgress,
      waveColor:     props.colorWave,
      url:           props.url,
      // Due to a Safari bug, backend must be
      // 'WebAudio' for Safari.
      // We could use 'MediaElement' for other
      // browsers, by doing browser detection.
      backend:      'WebAudio',
    })

     wavesurfer.on('ready', () => {
      el.onclick = () => {
        if (wavesurfer.isPlaying()) {
          wavesurfer.stop()
        }
        wavesurfer.play()
      }
    })
  })
</script>

<template>
  <div ref="container"></div>
</template>

<style scoped>
  div {
    cursor: pointer;
  }
</style>
