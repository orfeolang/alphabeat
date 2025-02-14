<script setup lang="ts">
  import Wavesurfer from 'wavesurfer.js'
  import { useTemplateRef, onMounted } from 'vue'

  const props = defineProps<{
    height: number|"auto"
    width: number|"auto"
    cursorColor: string
    progressColor: string
    waveColor: string
    url: string
  }>()

  const containerRef = useTemplateRef('container')

  onMounted(() => {
    const el = containerRef.value as HTMLElement
    const wavesurfer = Wavesurfer.create({
      // Due to a Safari bug, the backend must be 'WebAudio'.
      // We could use 'MediaElement' for other browsers.
      backend:      'WebAudio',
      container:     el,
      hideScrollbar: true,
      interact:      false,
      height:        props.height,
      width:         props.width,
      cursorColor:   props.cursorColor,
      progressColor: props.progressColor,
      waveColor:     props.waveColor,
      url:           props.url,
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
  <div class="wavesurfer" ref="container"></div>
</template>

<style scoped>
  .wavesurfer {
    cursor: pointer;
  }
</style>
