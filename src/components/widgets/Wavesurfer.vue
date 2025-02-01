<script setup lang="ts">
  import Wavesurfer from 'wavesurfer.js'
  import { useTemplateRef, onMounted } from 'vue'

  const props = defineProps<{
    cursorColor: string
    height: number|"auto"
    progressColor: string
    url: string
    waveColor: string
    width: number|"auto"
  }>()

  const containerRef = useTemplateRef('container')

  onMounted(() => {
    const el = containerRef.value as HTMLElement
    const wavesurfer = Wavesurfer.create({
      // Due to a Safari bug, the backend must be 'WebAudio'.
      // We could use 'MediaElement' for other browsers.
      backend:      'WebAudio',
      container:     el,
      cursorColor:   props.cursorColor,
      height:        props.height,
      hideScrollbar: true,
      interact:      false,
      progressColor: props.progressColor,
      url:           props.url,
      waveColor:     props.waveColor,
      width:         props.width,
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
