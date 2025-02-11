<script setup lang="ts">
  import { iconNameType } from '../../../helpers/type'

  import AddPath                 from './paths/Add.vue'
  import CaretDownPath           from './paths/CaretDown.vue'
  import CaretUpPath             from './paths/CaretUp.vue'
  import ChatPath                from './paths/Chat.vue'
  import CheckboxPath            from './paths/Checkbox.vue'
  import CheckboxCheckedPath     from './paths/CheckboxChecked.vue'
  import CloseOutlinePath        from './paths/CloseOutline.vue'
  import CloudUploadPath         from './paths/CloudUpload.vue'
  import ContinuePath            from './paths/Continue.vue'
  import ContinueFilledPath      from './paths/ContinueFilled.vue'
  import CreativeCommonsByPath   from './paths/CreativeCommonsBy.vue'
  import CreativeCommonsZeroPath from './paths/CreativeCommonsZero.vue'
  import DebugPath               from './paths/Debug.vue'
  import HelpPath                from './paths/Help.vue'
  import KeyboardPath            from './paths/Keyboard.vue'
  import LaunchPath              from './paths/Launch.vue'
  import LogoDiscordPath         from './paths/LogoDiscord.vue'
  import LogoGithubPath          from './paths/LogoGithub.vue'
  import MaximizePath            from './paths/Maximize.vue'
  import MinimizePath            from './paths/Minimize.vue'
  import OrfeoPath               from './paths/Orfeo.vue'
  import PausePath               from './paths/Pause.vue'
  import PauseFilledPath         from './paths/PauseFilled.vue'
  import PlayPath                from './paths/Play.vue'
  import PlayFilledPath          from './paths/PlayFilled.vue'
  import RedoPath                from './paths/Redo.vue'
  import RepeatPath              from './paths/Repeat.vue'
  import StopPath                from './paths/Stop.vue'
  import StopFilledPath          from './paths/StopFilled.vue'
  import SubtractPath            from './paths/Subtract.vue'
  import TrashCanPath            from './paths/TrashCan.vue'
  import UndoPath                from './paths/Undo.vue'
  import ViewPath                from './paths/View.vue'
  import ViewOffPath             from './paths/ViewOff.vue'

  interface Props {
    name: iconNameType
    size?: number
  }

  const {
    name,
    size = 32,
  } = defineProps<Props>()
</script>

<template>
  <svg
    class="icon__svg"
    :height=size
    :width=size
    aria-hidden="true"
    display="block"
    fill="currentColor"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <template      v-if="name === 'add'"><AddPath /></template>
    <template v-else-if="name === 'caret--down'"><CaretDownPath /></template>
    <template v-else-if="name === 'caret--up'"><CaretUpPath /></template>
    <template v-else-if="name === 'chat'"><ChatPath /></template>
    <template v-else-if="name === 'checkbox'"><CheckboxPath /></template>
    <template v-else-if="name === 'checkbox--checked'"><CheckboxCheckedPath /></template>
    <template v-else-if="name === 'close--outline'"><CloseOutlinePath /></template>
    <template v-else-if="name === 'cloud--upload'"><CloudUploadPath /></template>
    <template v-else-if="name === 'continue'"><ContinuePath /></template>
    <template v-else-if="name === 'continue--filled'"><ContinueFilledPath /></template>
    <template v-else-if="name === 'creative-commons--by'"><CreativeCommonsByPath /></template>
    <template v-else-if="name === 'creative-commons--zero'"><CreativeCommonsZeroPath /></template>
    <template v-else-if="name === 'debug'"><DebugPath /></template>
    <template v-else-if="name === 'help'"><HelpPath /></template>
    <template v-else-if="name === 'keyboard'"><KeyboardPath /></template>
    <template v-else-if="name === 'launch'"><LaunchPath /></template>
    <template v-else-if="name === 'logo--discord'"><LogoDiscordPath /></template>
    <template v-else-if="name === 'logo--github'"><LogoGithubPath /></template>
    <template v-else-if="name === 'maximize'"><MaximizePath /></template>
    <template v-else-if="name === 'minimize'"><MinimizePath /></template>
    <template v-else-if="name === 'orfeo'"><OrfeoPath /></template>
    <template v-else-if="name === 'pause'"><PausePath /></template>
    <template v-else-if="name === 'pause--filled'"><PauseFilledPath /></template>
    <template v-else-if="name === 'play'"><PlayPath /></template>
    <template v-else-if="name === 'play--filled'"><PlayFilledPath /></template>
    <template v-else-if="name === 'redo'"><RedoPath /></template>
    <template v-else-if="name === 'repeat'"><RepeatPath /></template>
    <template v-else-if="name === 'stop'"><StopPath /></template>
    <template v-else-if="name === 'stop--filled'"><StopFilledPath /></template>
    <template v-else-if="name === 'subtract'"><SubtractPath /></template>
    <template v-else-if="name === 'trash-can'"><TrashCanPath /></template>
    <template v-else-if="name === 'undo'"><UndoPath /></template>
    <template v-else-if="name === 'view'"><ViewPath /></template>
    <template v-else-if="name === 'view--off'"><ViewOffPath /></template>
  </svg>
</template>
