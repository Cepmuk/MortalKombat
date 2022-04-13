import calculateRawText from "./calculateRawText.js";
import showMeTheWinner from "./showMeTheWinner.js";
import addChatElement from "./addChatElement.js";
import createElement from './createElement.js'

const createReloadButton = () => {
  const $reloadWrap = createElement('div', 'reloadWrap')
  const $reloadButton = createElement('button', 'button')
  $reloadButton.innerText = 'Restart'
  $reloadWrap.appendChild($reloadButton)
  document.querySelector('.root').appendChild($reloadWrap)

  $reloadButton.addEventListener('click', function () {
    window.location.pathname = './'
  })

  return $reloadButton
}

const showResult = async ($fightForm, $divArenas, $chat, player1, player2) => {

    if (player1.hp === 0 || player2.hp === 0) {
      $fightForm.disabled = true;
      createReloadButton()
    }
  
    if (player1.hp === 0 && player2.hp != 0) {
      $divArenas.appendChild(showMeTheWinner(player2.name))
      const winText = calculateRawText('end', player2.name, player1.name)
      addChatElement(winText, $chat)
    } else if (player2.hp === 0 && player1.hp != 0) {
      $divArenas.appendChild(showMeTheWinner(player1.name))
      const winText = calculateRawText('end', player1.name, player2.name)
      addChatElement(winText, $chat)
    } else if (player1.hp === 0 && player2.hp === 0) {
      $divArenas.appendChild(showMeTheWinner())
      const drawText = calculateRawText('draw')
      addChatElement(drawText, $chat)
    }
  }

  export default showResult