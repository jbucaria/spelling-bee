const keys = document.querySelectorAll('.key')
const inputTextEl = document.getElementById('textInput')
const addWordEl = document.getElementById('addword')
let inputText = ''
let capsLock = false

function initializeKeyboard() {
  keys.forEach(key => {
    key.addEventListener('click', () => {
      const keyType = key.classList.contains('caps') ? 'caps' : key.classList.contains('delete') ? 'delete' : key.classList.contains('space') ? 'space' : 'letter'

      if (keyType === 'letter') {
        let letter = capsLock ? key.textContent.toUpperCase() : key.textContent.toLocaleLowerCase()
        inputText += letter
      } else if (keyType === 'caps') {
        capsLock = !capsLock
        key.classList.toggle('active', capsLock)
      } else if (keyType === 'delete') {
        inputText = inputText.slice(0, -1)
      }

      if (inputTextEl.classList.contains('active')) {
        inputTextEl.value = inputText
      }
    })
  })
}

export { initializeKeyboard, inputText }
