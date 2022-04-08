const $divArenas = document.querySelector('.arenas');
const $fightForm = document.querySelector('.control')
const $chat = document.querySelector('.chat')

import { player1, player2 } from "./modules/Players.js";
import createPlayer from './modules/createPlayer.js'
import { enemyChoise, playerChoise } from "./modules/damageCalculation.js";
import calculateCurrentTime from './modules/calculateCurrentTime.js'
import addChatElement from './modules/addChatElement.js'
import calculateRawText from './modules/calculateRawText.js'
import showResult from './modules/showResult.js'

$fightForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const enemy = enemyChoise()
  const player = playerChoise($fightForm)

  if (enemy.hit != player.defence) {
    player1.changeHp(enemy.value)
    player1.renderHP(player1.elHP());

    const hitText = `${calculateCurrentTime()} ${calculateRawText('hit', player2.name, player1.name)} [-${enemy.value}] [${player1.hp}]`
    addChatElement(hitText, $chat)
  } else {
    const blockText = `${calculateCurrentTime()} ${calculateRawText('defence', player2.name, player1.name)}`
    addChatElement(blockText, $chat)
  }

  if (player.hit != enemy.defence) {
    player2.changeHp(player.value)
    player2.renderHP(player2.elHP());
    const hitText = `${calculateCurrentTime()} ${calculateRawText('hit', player1.name, player2.name)} [-${player.value}] [${player2.hp}]`
    addChatElement(hitText, $chat)
  } else {
    const blockText = `${calculateCurrentTime()} ${calculateRawText('defence', player1.name, player2.name)}`
    addChatElement(blockText, $chat)
  }

  showResult($fightForm, $divArenas, $chat, player1, player2)

})

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));
const startText = calculateRawText('start', player1.name, player2.name)
addChatElement(startText, $chat)
