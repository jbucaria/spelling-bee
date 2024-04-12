import { initializeKeyboard, inputText } from './keyboard.js'

const playButton = document.getElementById('play-btn')
const checkBtn = document.getElementById('check-btn')
const resetBtn = document.getElementById('refresh-btn')
const nextBtn = document.getElementById('next')
const addBtn = document.getElementById('add-btn')
const prevBtn = document.getElementById('prev')
const currentEl = document.getElementById('current')
const validationEl = document.getElementById('validationMessage')
const inputTextEl = document.getElementById('textInput')
const addWordEl = document.getElementById('addword')

let currentIndex = 0
let predeterminedWord = ''
let words = []
let fileLength = words.length

initializeKeyboard()

inputTextEl.addEventListener('click', () => {
  inputTextEl.classList.add('active')
  addWordEl.classList.remove('active')
})

addWordEl.addEventListener('click', () => {
  inputTextEl.classList.remove('active')
  addWordEl.classList.add('active')
})

addBtn.addEventListener('click', () => {
  const word = addWordEl.value
  // Retrieve the existing words array from local storage
  words = JSON.parse(localStorage.getItem('words')) || []
  // Add the new word to the array

  if (word.length === 0) {
    validationEl.textContent = 'Enter word'
    validationEl.style.color = 'red'
  } else if (words.includes(word)) {
    validationEl.textContent = 'Word Already Added'
    validationEl.style.color = 'red'
  } else {
    words.push(word)
    validationEl.textContent = 'Word Added'
    validationEl.style.color = 'green'
  }

  // Save the updated array back to local storage
  localStorage.setItem('words', JSON.stringify(words))

  // Clear the input box
  addWordEl.value = ''
  updateCurrentElement()

  setTimeout(function () {
    inputTextEl.value = ''
    validationEl.textContent = ''
  }, 1500)
})

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word)
  speechSynthesis.speak(utterance)
}

playButton.addEventListener('click', () => {
  const currentWord = words[currentIndex]
  speakWord(currentWord)
})

// Predetermined word

checkBtn.addEventListener('click', () => {
  // Get the input value
  var input = inputTextEl.value.trim()
  const currentWord = words[currentIndex]

  if (input === currentWord) {
    validationEl.textContent = 'Correct!!'
    validationEl.style.color = 'green'
    currentIndex++
  } else {
    validationEl.textContent = 'Try Again'
    validationEl.style.color = 'red'
  }

  updateCurrentElement()
  setTimeout(function () {
    inputTextEl.value = ''
    validationEl.textContent = ''
  }, 1500)
})

nextBtn.addEventListener('click', () => {
  currentIndex++

  if (currentIndex >= words.length) {
    currentIndex = 0
  }

  inputTextEl.value = ''
  validationEl.textContent = ''

  updateCurrentElement()
})

prevBtn.addEventListener('click', () => {
  if (currentIndex === 0) {
    currentIndex = words.length - 1
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
  localStorage.clear()
  words = []
  updateCurrentElement2()
})

function updateCurrentElement() {
  currentEl.textContent = `${currentIndex + 1}/${words.length}`
}
function updateCurrentElement2() {
  currentEl.textContent = `${currentIndex}/${words.length}`
}
