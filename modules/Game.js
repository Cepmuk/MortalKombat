const $divArenas = document.querySelector('.arenas');
const $fightForm = document.querySelector('.control')
const $chat = document.querySelector('.chat')

import Player from "./Player.js";
import { enemyChoise, playerChoise } from "./damageCalculation.js";
import calculateCurrentTime from './calculateCurrentTime.js'
import addChatElement from './addChatElement.js'
import calculateRawText from './calculateRawText.js'
import showResult from './showResult.js'

class Game {
    
    battle = (player1, player2) => {
    $fightForm.addEventListener('submit', function(e) {
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

    })}

    start = () => {
        const player1 = new Player({
            player: 1,
            name: 'Sub-Zero',
            img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
        })

        const player2 = new Player({
            player: 2,
            name: 'Scorpion',
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        })
        $divArenas.appendChild(player1.createPlayer());
        $divArenas.appendChild(player2.createPlayer());
        const startText = calculateRawText('start', player1.name, player2.name)
        addChatElement(startText, $chat)
        this.battle(player1, player2)
    }
}

export default Game