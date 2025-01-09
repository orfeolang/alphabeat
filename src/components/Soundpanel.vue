<script setup lang="ts">
  import SoundpanelItem from './SoundpanelItem.vue'

  const props = defineProps<{
    sounds: {
      filepath: string,
      group: {
        color: {
          cursor: string,
          progress: string,
          wave: string
        }
      },
      label: string,
      letter: string
    }[]
  }>()
</script>

<template>
  <SoundpanelItem
    v-for="(sound, index) in props.sounds"
    :key=index
    :colorCursor=sound.group.color.cursor
    :colorProgress=sound.group.color.progress
    :colorWave=sound.group.color.wave
    :filepath=sound.filepath
    :label=sound.label
    :letter=sound.letter
  />
</template>
