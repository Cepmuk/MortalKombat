const $divArenas = document.querySelector('.arenas');
const $fightForm = document.querySelector('.control')
const $chat = document.querySelector('.chat')

import Player from "./Player.js";
import playerChoise from "./playerChoise.js";
import calculateCurrentTime from './calculateCurrentTime.js'
import addChatElement from './addChatElement.js'
import calculateRawText from './calculateRawText.js'
import showResult from './showResult.js'


class Game {

    battle = (player1, player2) => {
        $fightForm.addEventListener('submit', function (e) {
            e.preventDefault()

            const playerAD = playerChoise($fightForm)

            const damageCalculation = async () => {

                const body = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
                    method: 'POST',
                    body: JSON.stringify(
                        playerAD
                    )
                }).then(res => res.json())
                return body
            }

            const getRoundResult = async () => {
                const roundResult = await damageCalculation()

                const player = roundResult['player1']
                const enemy = roundResult['player2']
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

            }

            const battleResult = async () => {
                await getRoundResult()
                return await showResult($fightForm, $divArenas, $chat, player1, player2)
            }

            battleResult()
        })
    }

    // Full list of characters
    //getPlayers = async () => {
    //    const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json())
    //    return body
    //}

    getPlayerChosen = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json())
        return body
    }

    start = async () => {
        const p1 = JSON.parse(localStorage.getItem('player1'))
        const p2 = await this.getPlayerChosen()

        const player1 = new Player({
            ...p1,
            player: 1
        })

        const player2 = new Player({
            ...p2,
            player: 2
        })

        $divArenas.appendChild(player1.createPlayer());
        $divArenas.appendChild(player2.createPlayer());
        const startText = calculateRawText('start', player1.name, player2.name)
        addChatElement(startText, $chat)
        this.battle(player1, player2)
    }
}

export default Game