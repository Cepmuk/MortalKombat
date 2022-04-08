import getRandomFrom1to from './getRandomFrom1to.js'

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
  }
  
  const ATTACK = ['head', 'body', 'foot'];
  
  export const enemyChoise = () => {
    const hit = ATTACK[getRandomFrom1to(3) - 1]
    const defence = ATTACK[getRandomFrom1to(3) - 1]
    return {
      value: getRandomFrom1to(HIT[hit]),
      hit,
      defence
    }
  }
  
  export const playerChoise = ($fightForm) => {
    const playerChoise = {}
  
    for (let item of $fightForm) {
      if (item.checked && item.name === 'hit') {
        playerChoise.value = getRandomFrom1to(HIT[item.value])
        playerChoise.hit = item.value
      }
      if (item.checked && item.name === 'defence') {
        playerChoise.defence = item.value
      }
      item.checked = false
    }
  
    return playerChoise
  }
