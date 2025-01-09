<script setup lang="ts">
  import Select from './widgets/Select.vue'
  import Soundpanel from './Soundpanel.vue'
  import soundpacks from '../db/json/soundpacks.json'
  import { ref, computed } from 'vue'

  const soundpacksNames = soundpacks.map(soundpack => soundpack.name)
  const selectedSoundpackName = ref(soundpacksNames[0])

  const selectSoundpackName = (selected: string) =>
    selectedSoundpackName.value = selected

  const sounds = computed(() => {
    return soundpacks.filter(
      soundpack => soundpack.name === selectedSoundpackName.value
    )[0].sounds
  })
</script>

<template>
  <div class="sound-library">
    <div class="select">
      <Select
        :default=selectedSoundpackName
        :options=soundpacksNames
        @input="selectSoundpackName"
      />
    </div>
    <div class="sound-panel">
      <Soundpanel
        :key=selectedSoundpackName
        :sounds=sounds
      />
    </div>
  </div>
</template>

<style scoped>
  .sound-library {
    background: #000000;
    padding: 20px;
    text-align: center;
    width: 410px;
  }

  .sound-panel {
    column-gap: 5px;
    display: grid;
    grid-template-columns: auto auto;
    margin-top: 8px;
    padding-top: 0px;
    row-gap: 5px;
  }
</style>
