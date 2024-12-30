<script setup lang="ts">
  import sounds from '../db/json/sounds.json'
  import Wavesurfer from './widgets/Wavesurfer.vue'
  import { ref } from 'vue'
  import { getDeepValue } from '../helpers/objects.ts'

  const shallowRows = ref([...sounds])
  const search = ref('')

  const licenseCodeToIconClass = (code: string|null) => {
    return code === 'CC0'
      ? 'icon-creative-commons-zero'
      : code === 'A3' || code === 'A4'
        ? 'icon-creative-commons-by'
        : ''
  }

  const zebraClass = (index: number) => {
    return index % 2 === 0 ? 'even' : 'odd'
  }

  const sortData = (headerName: string, sortBy: string, dir: string) => {
    // Update current header to sortingHeader.
    sortingHeader.name = headerName
    sortingHeader.dir = dir
    // Update header's sorting direction.
    const header = headers.find(header => header.sortKey === sortBy)
    if (header) header.dir = dir
    shallowRows.value = shallowRows.value.sort((a, b) => {
      const a1 = getDeepValue(a, sortBy) as string
      const b1 = getDeepValue(b, sortBy) as string
      return (dir === 'ASC')
        ? a1.localeCompare(b1)
        : b1.localeCompare(a1)
    })
  }

  const headers = [
    { name: null,          sortKey: null                                   },
    { name: 'group',       sortKey: 'group.name',               dir: 'ASC' },
    { name: 'sound',       sortKey: null,                                  },
    { name: 'label',       sortKey: 'label',                    dir: 'ASC' },
    { name: 'name',        sortKey: 'name',                     dir: 'ASC' },
    { name: 'license',     sortKey: 'attribution.license.code', dir: 'ASC' },
    { name: 'author',      sortKey: 'attribution.author',       dir: 'ASC' },
    { name: 'source name', sortKey: 'attribution.sourcename',   dir: 'ASC' },
    { name: 'url',         sortKey: 'attribution.url',          dir: 'ASC' },
  ]

  const sortingHeader = {
    name: 'group',
    dir: 'ASC',
  }

  const filteredShallowRows = () => {
    const searchText = search.value.toLowerCase()
    return shallowRows.value.filter(row =>
      row.group.name.toLowerCase().includes(searchText) ||
      row.label.toLowerCase().includes(searchText) ||
      row.name?.toLowerCase().includes(searchText) ||
      row.attribution.author?.toLowerCase().includes(searchText) ||
      row.attribution.sourcename?.toLowerCase().includes(searchText)
    )
  }

  const headerNameToClassName = (headerName: string|null) =>
    (headerName || 'number').replace(' ', '')
</script>

<template>
  <div>
    <h2>Sound Explorer</h2>
    <div class="soundexplorer-wrapper">
      <div class="search">
        <input type="text" v-model="search" placeholder="search.." />
        <span class="count"> {{ filteredShallowRows().length }} </span>
      </div>
      <div v-if="filteredShallowRows().length > 0">
        <table class="sounds">
          <thead>
            <tr>
              <th
                v-for="header in headers"
                :class="headerNameToClassName(header.name)"
              >
                {{ header.name }}
                <span
                  v-if="header.name === 'url'"
                  class="icon-external-link"
                ></span>
              </th>
            </tr>
            <tr>
              <th
                v-for="header in headers"
                :class="headerNameToClassName(header.name)"
              >
                <template v-if="header.sortKey !== null">
                  <button @click="sortData(header.name, header.sortKey, 'ASC')">
                    <span
                      class="icon-arrow-down"
                      :class="{
                        active: header.dir === 'ASC',
                       chosen: header.dir === 'ASC' && header.name === sortingHeader.name,
                      }"
                    >
                    </span>
                  </button>
                  <button @click="sortData(header.name, header.sortKey, 'DESC')">
                    <span
                      class="icon-arrow-up"
                      :class="{
                        active: header.dir === 'DESC',
                        chosen: header.dir === 'DESC' && header.name === sortingHeader.name,
                      }"
                    >
                    </span>
                  </button>
                </template>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(sound, index) in filteredShallowRows()"
              :class="[sound.group.name, zebraClass(index)]"
            >
              <td class="number"> {{ sound.number     }} </td>
              <td class="group">  {{ sound.group.name }} </td>
              <td class="sound">
                <Wavesurfer
                  :height=40
                  :width=80
                  :colorCursor=sound.group.color.cursor
                  :colorProgress=sound.group.color.progress
                  :colorWave=sound.group.color.wave
                  :url=sound.filepath
                  :key=sound.filepath
                />
              </td>
              <td class="label"> {{ sound.label }} </td>
              <td class="name">  {{ sound.name  }} </td>
              <td class="license">
                <span
                  :class="licenseCodeToIconClass(sound.attribution.license.code)"
                >
                </span>
              </td>
              <td class="author">     {{ sound.attribution.author     }} </td>
              <td class="sourcename"> {{ sound.attribution.sourcename }} </td>
              <td class="url">
                <a :href="sound.attribution.url">
                  {{ sound.attribution.url }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="legend">
          <tbody>
            <tr>
              <th><span class="icon-creative-commons-zero"></span></th>
              <td>Creative Commons Zero</td>
            </tr>
            <tr>
              <th><span class="icon-creative-commons-by"></span></th>
              <td>Creative Commons Attribution 3.0 or 4.0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
  h2 {
    color: #d19a66;
    margin-bottom: 20px;
    text-align: center;
  }

  .soundexplorer-wrapper {
    width: 1198px;
  }

  .search {
    align-items: center;
    display: flex;
    margin-bottom: 10px;

    input {
      background: #111111;
      border: 1px solid transparent;
      color: #999999;
      display: block;
      font-size: 16px;
      padding: 10px 20px;
      width: 300px;
    }

    input:focus {
      border:1px solid #56b6c2bb;
      outline: none !important;
    }

    .count {
      color: #555;
      margin-left: 10px;
    }

    ::placeholder {
      color: #444;
      opacity: 1; /* Firefox */
    }

    /* Edge 12 -18 */
    ::-ms-input-placeholder {
      color: #444;
    }
  }

  table.sounds {
    table-layout: fixed;
    width: 100%;

    th.number,     td.number     { width: 35px;  }
    th.group,      td.group      { width: 69px;  }
    th.sound,      td.sound      { width: 98px;  }
    th.label,      td.label      { width: 65px;  }
    th.name,       td.name       { width: 179px; }
    th.license,    td.license    { width: 80px;  }
    th.author,     td.author     { width: 160px; }
    th.sourcename, td.sourcename { width: 263px; }
    th.url,        td.url        { width: 249px; }

    th {
      background: #000000;
      color: #444;
      font-weight: 500;
      text-transform: uppercase;
      padding: 0 10px;
    }

    /* Header name row */
    tr:nth-child(1) th {
      padding-bottom: 2px;
      padding-top: 4px;
    }

    /* Sort arrows row */
    tr:nth-child(2) th {
      padding-bottom: 2px;
    }

    td {
      border: none;
      color: #999;
      padding: 8px;
    }

    td.number {
      color: #444;
    }

    tr.even td { background: #111111;   }
    tr.odd  td { background: #11111144; }

    tr.cymbal td.group { color: #89ca78; }
    tr.drum   td.group { color: #61afef; }
    tr.kick   td.group { color: #f44747; }
    tr.perc   td.group { color: #d54fde; }
    tr.synth  td.group { color: #be5046; }
    tr.voice  td.group { color: #e5c07b; }

    tr.cymbal td.sound:hover { background: #89ca7710; }
    tr.drum   td.sound:hover { background: #61afef10; }
    tr.kick   td.sound:hover { background: #f4474710; }
    tr.perc   td.sound:hover { background: #d55fde10; }
    tr.synth  td.sound:hover { background: #be504610; }
    tr.voice  td.sound:hover { background: #e5c07b10; }

    td.license {
      text-align: center;
    }

    .icon-external-link {
      color: #555;
      font-size: 20px;
    }

    .icon-creative-commons-zero,
    .icon-creative-commons-by {
      font-size: 20px;
    }
    .icon-creative-commons-zero { color: #89ca78; }
    .icon-creative-commons-by   { color: #d55fde; }

    .icon-arrow-down,
    .icon-arrow-up {
      color: #444;
      font-size: 20px;
    }

    .icon-arrow-down.active,
    .icon-arrow-up.active {
      color: #666;
    }

    .icon-arrow-down.chosen,
    .icon-arrow-up.chosen {
      color: #d55fde;
    }

    .icon-arrow-down:hover,
    .icon-arrow-up:hover {
      color: #d55fde;
    }
  }

  table.legend {
    margin-top: 10px;

    th, td {
      background: #11111144;
      border: 1px solid #111111;
      padding: 10px 8px 8px 8px;
    }

    th {
      font-size: 16px;
      .icon-creative-commons-zero { color: #89ca7877; }
      .icon-creative-commons-by   { color: #d55fde77; }
    }

    td {
      color: #99999977;
      font-size: 12px;
    }
  }
</style>
