const playerChoise = ($fightForm) => {
    const playerChoise = {}
  
    for (let item of $fightForm) {
      if (item.checked && item.name === 'hit') {
        playerChoise.hit = item.value
      }
      if (item.checked && item.name === 'defence') {
        playerChoise.defence = item.value
      }
      item.checked = false
    }
  
    return playerChoise
  }

  export default playerChoise