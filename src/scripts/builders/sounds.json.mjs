import readline from 'readline'
import fs from 'fs'

const path = {
  sounds: './src/assets/sounds/',
  soundfiletype: '../../config/sounds/soundfiletype.txt',
  soundsconfig: '../../config/sounds/sounds.txt',
}

/* -------------------------------------------------------------------
  Get soundfiletype
------------------------------------------------------------------- */

async function getFirstLine(pathToFile) {
  const readable = fs.createReadStream(pathToFile)
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

const soundfiletype = await getFirstLine(path.soundfiletype)

/* -------------------------------------------------------------------
  Get sounds JSON
------------------------------------------------------------------- */

async function makeSoundsJSON(pathToFile) {
  const readable = fs.createReadStream(pathToFile)
  const reader = readline.createInterface({ input: readable })

  const sounds = []
  const spacify_ = str => str.replaceAll('_', ' ')

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
    const content = JSON.stringify(sounds, null, 4) + '\n'
    fs.writeFile('../../json/sounds.json', content, err => {
      if (err) {
        console.error(err)
     }
      else {
        console.log('sounds.json written.')
      }
    })
  })
}

makeSoundsJSON(path.soundsconfig)
