import fs from 'node:fs'
import readline from 'node:readline'
import { mkdirp } from 'mkdirp'

const path = {
  assets: {
    sounds:        './src/assets/sounds/',
  },
  build: {
    soundpacks:    './src/db/json/soundpacks.json',
    sounds:        './src/db/json/sounds.json',
  },
  src: {
    letters:       './src/db/src/letters.txt',
    licenses:      './src/db/src/licenses.txt',
    soundfiletype: './src/db/src/soundfiletype.txt',
    soundgroups:   './src/db/src/soundgroups.txt',
    soundsinfos:   './src/db/src/soundsinfos.txt',
    soundpacks:    "./src/db/src/soundpacks/",
  },
}

// -------------------------------------------------------------------
// Helpers.
// -------------------------------------------------------------------
const clone = obj => JSON.parse(JSON.stringify(obj))
const extractValue = str => str.split(':')[1]
const getDirFromFilePath = str => str.substring(0, str.lastIndexOf('/'))
const spacify_ = str => str.replaceAll('_', ' ')

const getFileNamesOfType = (dir, fileType) => {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.' + fileType))
}

async function extractFileData(filePath, dataStruct) {
  const readable = fs.createReadStream(filePath)
  const reader = readline.createInterface({ input: readable })
  const data = await new Promise((resolve) => {
    const arr = []
    reader.on('line', line => {
      const parts = line.split(/\s+/)
      const obj = dataStruct(parts)
      arr.push(obj)
    })
    reader.on('close', () => {
      resolve(arr)
    })
  })
  return data
}

async function getFirstFileLine(filePath) {
  const readable = fs.createReadStream(filePath)
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

async function writeFile(filePath, data) {
  const dir = getDirFromFilePath(filePath)
  await mkdirp(dir)
  const jsonify = payload => JSON.stringify(payload, null, 4) + '\n'
  fs.writeFile(filePath, jsonify(data), err => {
    if (err) {
      console.error(err)
    }
    else {
      console.log(`\x1b[1;32m\u2714\x1b[m ${filePath} written.`)
    }
  })
}

// -------------------------------------------------------------------
// 1) Get soundfiletype.
// -------------------------------------------------------------------
const soundfiletype = await getFirstFileLine(path.src.soundfiletype)

// -------------------------------------------------------------------
// 2) Extract soundgroups.
// -------------------------------------------------------------------
async function extractSoundgroups() {
  const dataStruct = parts => {
     return {
        name: parts[0],
        color: {
          cursor:   extractValue(parts[1]),
          progress: extractValue(parts[2]),
          wave:     extractValue(parts[3]),
        }
     }
  }
  return extractFileData(path.src.soundgroups, dataStruct)
}

const soundgroups = await extractSoundgroups()

// -------------------------------------------------------------------
// 3) Extract licenses.
// -------------------------------------------------------------------
async function extractLicenses() {
  const dataStruct = parts => {
     return {
        code: parts[0],
        name: spacify_(parts[1]),
        url:  parts[2],
     }
  }
  return extractFileData(path.src.licenses, dataStruct)
}

const licenses = await extractLicenses()

// -------------------------------------------------------------------
// 4a) Get loaded sound names without extension.
// -------------------------------------------------------------------
const soundsLoaded = getFileNamesOfType(path.assets.sounds, soundfiletype)

// -------------------------------------------------------------------
// 4b) Extract optional extra sound infos from file.
// -------------------------------------------------------------------
async function extractSoundsInfos() {
  const getDataOrNull = (arr, i, isSpacified = false) => {
    return arr.length > i && arr[i] && arr[i] !== 'null'
      ? isSpacified ? spacify_(arr[i]) : arr[i]
      : null
  }
  const dataStruct = parts => {
    return {
      filename: parts[0] + '.' + soundfiletype,
      name: getDataOrNull(parts, 1, true),
      attribution: {
        license:    getDataOrNull(parts, 2),
        author:     getDataOrNull(parts, 3),
        sourcename: getDataOrNull(parts, 4, true),
        url:        getDataOrNull(parts, 5),
      },
    }
  }
  return extractFileData(path.src.soundsinfos, dataStruct)
}

const soundsInfos = await extractSoundsInfos()

// -------------------------------------------------------------------
// 4c) Build sounds.
// -------------------------------------------------------------------
const sounds = []
soundsLoaded.forEach((soundLoaded, i) => {
  const groupName = soundLoaded.substring(0, soundLoaded.lastIndexOf('_'))
  const sound = {
    number: i + 1,
    filename: soundLoaded,
    filepath: path.assets.sounds + soundLoaded,
    group: soundgroups.find(soundgroup => soundgroup.name === groupName),
    label: soundLoaded.substring(
      soundLoaded.lastIndexOf('_') + 1, soundLoaded.lastIndexOf('.')
    ),
  }
  const soundInfo = soundsInfos.find(
    soundInfo => soundInfo.filename === soundLoaded
  )
  if (soundInfo) {
    sound.name = soundInfo.name
    sound.attribution = soundInfo.attribution

    const license = licenses.find(
      license => license.code === sound.attribution.license
    )
    if (license) {
      sound.attribution.license = license
    }
    else {
      sound.attribution.license = {
        code: null,
        name: null,
        url: null,
      }
    }
  }
  else {
    sound.name = null
    sound.attribution = {
      license: {
        code: null,
        name: null,
        url: null,
      },
      author:  null,
      sourcename: null,
      url: null,
    }
  }

  sounds.push(sound)
})

// -------------------------------------------------------------------
// 5) Get letters.
// -------------------------------------------------------------------
const letters = await getFirstFileLine(path.src.letters)

// -------------------------------------------------------------------
// 6) Make raw soundpacks.
// -------------------------------------------------------------------
let soundpackfiles = fs.readdirSync(path.src.soundpacks)
  .filter(file => file.endsWith('.txt'))

async function makeRawSoundpacks() {
  const soundpacks = []
  async function makeSoundpack(soundpackfile) {
    const dataStruct = parts => {
       return parts[0]
    }
    return extractFileData(path.src.soundpacks + soundpackfile, dataStruct)
  }
  for (let i = 0, len = soundpackfiles.length; i < len; i++) {
    const soundpack = {
      name: soundpackfiles[i].split('.')[0],
      soundlabels: await makeSoundpack(soundpackfiles[i]),
    }
    soundpacks.push(soundpack)
  }
  return soundpacks
}

const rawSoundpacks = await makeRawSoundpacks()

// -------------------------------------------------------------------
// 7) Make soundpacks.
// -------------------------------------------------------------------
const soundpacks = []
rawSoundpacks.forEach(rawSoundpack => {
  const soundpack = {}
  soundpack.name = rawSoundpack.name
  soundpack.sounds = []
  rawSoundpack.soundlabels.forEach((soundlabel, i) => {
    const sound = clone(sounds.find(sound => sound.label === soundlabel))
    sound.letter = letters.at(i)
    soundpack.sounds.push(sound)
  })
  soundpacks.push(soundpack)
})

// -------------------------------------------------------------------
// 8) Add soundspacks to sounds.
// -------------------------------------------------------------------
sounds.forEach(sound => {
  sound.soundpacks = []
  rawSoundpacks.forEach(rawSoundpack => {
    if (rawSoundpack.soundlabels.includes(sound.label)) {
      sound.soundpacks.push(rawSoundpack.name)
    }
  })
})

// -------------------------------------------------------------------
// 9) Write JSON files.
// -------------------------------------------------------------------
writeFile(path.build.sounds, sounds)
writeFile(path.build.soundpacks, soundpacks)
