import readline from 'node:readline'
import fs from 'node:fs'

const path = {
  sounds: './src/assets/sounds/',
  soundfiletype: '../../config/sounds/soundfiletype.txt',
  soundsconfig: '../../config/sounds/sounds.txt',
  soundgroupsconfig: '../../config/sounds/soundgroups.txt',
}

/* -------------------------------------------------------------------
  Helpers
------------------------------------------------------------------- */
const spacify_ = str => str.replaceAll('_', ' ')
const extractColor = str => str.split(':')[1]
const jsonify = payload => JSON.stringify(payload, null, 4) + '\n'

async function getFirstLine(filepath) {
  const readable = fs.createReadStream(filepath)
  const reader = readline.createInterface({ input: readable })
  const line = await new Promise((resolve) => {
    reader.on('line', (line) => {
      reader.close()
      resolve(line)
    })
  })
  readable.close()
  return line
}

/* -------------------------------------------------------------------
  Get soundfiletype
------------------------------------------------------------------- */
const soundfiletype = await getFirstLine(path.soundfiletype)

/* -------------------------------------------------------------------
  makeSoundGroupsJSON
------------------------------------------------------------------- */

async function makeSoundGroupsJSON(filepath) {
  const readable = fs.createReadStream(filepath)
  const reader = readline.createInterface({ input: readable })

  const json = await new Promise((resolve) => {
    const soundgroups = []
    reader.on('line', line => {
      const parts = line.split(/\s+/)
      const soundgroup = {
        id:            Number(parts[0]),
        name:          parts[1],
        desc:          spacify_(parts[2]),
        colorCursor:   extractColor(parts[3]),
        colorProgress: extractColor(parts[4]),
        colorWave:     extractColor(parts[5]),
      }
      soundgroups.push(soundgroup)
    })

    reader.on('close', () => {
      resolve(jsonify(soundgroups))
    })
  })
  return json
}

const soundgroups = await makeSoundGroupsJSON(path.soundgroupsconfig)
console.log(soundgroups)

/* -------------------------------------------------------------------
  makeSoundsJSON
------------------------------------------------------------------- */
async function makeSoundsJSON(filepath) {
  const readable = fs.createReadStream(filepath)
  const reader = readline.createInterface({ input: readable })

  const json = await new Promise((resolve) => {
    const sounds = []
    reader.on('line', line => {
      const parts = line.split(/\s+/)
      const sound = {
        id:      Number(parts[0]),
        groupId: Number(parts[1]),
        label:   parts[2],
        desc:    spacify_(parts[3]),
        file:    `${path.sounds}${parts[4]}.${soundfiletype}`,
        attribution: {
          url:       parts[5],
          licenseId: Number(parts[6]),
          author:    parts[7],
          name:      spacify_(parts[8]),
        },
      }
      sounds.push(sound)
    })

    reader.on('close', () => {
      resolve(jsonify(sounds))
    })
  })
  return json
}

const soundsJSON = await makeSoundsJSON(path.soundsconfig)
// console.log(soundsJSON)
