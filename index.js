const playButton = document.getElementById('play-btn')
const checkBtn = document.getElementById('check-btn')
const resetBtn = document.getElementById('refresh-btn')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')
const currentEl = document.getElementById('current')
const validationEl = document.getElementById('validationMessage')
const inputTextEl = document.getElementById('textInput')

const audioFiles = [
  { audio: '/audioFiles/florida.mp3', word: 'Florida' },
  { audio: '/audioFiles/girl.mp3', word: 'girl' },
  { audio: '/audioFiles/know.mp3', word: 'know' },
  { audio: '/audioFiles/allowed_en_us_1.mp3', word: 'allowed' },
  { audio: '/audioFiles/boston_en_us_1.mp3', word: 'Boston' },
  { audio: '/audioFiles/brought_en_us_1.mp3', word: 'brought' },
  { audio: '/audioFiles/earmuffs_en_us_1.mp3', word: 'earmuffs' },
  { audio: '/audioFiles/exciting_en_us_1.mp3', word: 'exciting' },
  { audio: '/audioFiles/expected_en_us_1.mp3', word: 'expected' },
  { audio: '/audioFiles/favorite_en_us_1.mp3', word: 'favorite' },
  { audio: '/audioFiles/thought.mp3', word: 'thought' },
  { audio: '/audioFiles/hurt_en_us_1.mp3', word: 'hurt' },
  { audio: '/audioFiles/leaning_en_us_1.mp3', word: 'leaning' },
  { audio: '/audioFiles/love_en_us_1.mp3', word: 'love' },
  { audio: '/audioFiles/memories_en_us_1.mp3', word: 'memories' },
  { audio: '/audioFiles/pistol_en_us_1.mp3', word: 'pistol' },
  { audio: '/audioFiles/powerful_en_us_1.mp3', word: 'powerful' },
  { audio: '/audioFiles/shooting_en_us_1.mp3', word: 'shooting' },
  { audio: '/audioFiles/shoulder_en_us_1.mp3', word: 'shoulder' },
  { audio: '/audioFiles/spoiler_en_us_1.mp3', word: 'spoiler' },
  { audio: '/audioFiles/thrilling_en_us_1.mp3', word: 'thrilling' },
]

let currentIndex = 0
let predeterminedWord = ''
let fileLength = audioFiles.length

playButton.addEventListener('click', () => {
  if (currentIndex < audioFiles.length) {
    const currentAudio = audioFiles[currentIndex].audio
    const audio = new Audio(currentAudio)
    predeterminedWord = audioFiles[currentIndex].word
    audio.play()
  }
  updateCurrentElement()
})

// Predetermined word

checkBtn.addEventListener('click', () => {
  // Get the input value
  var input = inputTextEl.value.trim()

  if (input === predeterminedWord) {
    validationEl.textContent = 'Correct!!'
    validationEl.style.color = 'green'
  } else {
    validationEl.textContent = 'Try Again'
    validationEl.style.color = 'red'
  }

  setTimeout(function () {
    inputTextEl.value = ''
    validationEl.textContent = ''
  }, 1500)
})

nextBtn.addEventListener('click', () => {
  currentIndex++

  if (currentIndex >= audioFiles.length) {
    currentIndex = 0
  }

  inputTextEl.value = ''
  validationEl.textContent = ''

  updateCurrentElement()
})

prevBtn.addEventListener('click', () => {
  if (currentIndex === 0) {
    currentIndex = audioFiles.length - 1
  } else {
    currentIndex--
  }
  document.getElementById('textInput').value = ''
  validationEl.textContent = ''

  updateCurrentElement()
})

resetBtn.addEventListener('click', () => {
  currentIndex = 0
  document.getElementById('textInput').value = ''
  validationEl.textContent = ''
  updateCurrentElement()
})

function updateCurrentElement() {
  currentEl.textContent = `${currentIndex + 1}/${audioFiles.length}`
}
