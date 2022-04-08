import createElement from './createElement.js'

const createPlayer = (playerPers) => {
  
    const {player, hp, name, img} = playerPers
  
    const $divPlayer = createElement('div', ('player' + player))
  
    const $divProgressbar = createElement('div', 'progressbar');
    $divPlayer.appendChild($divProgressbar);
  
    const $divCharacter = createElement('div', 'character');
    $divPlayer.appendChild($divCharacter);
  
    const $divLife = createElement('div', 'life');
    $divLife.style.width = hp + '%';
    $divProgressbar.appendChild($divLife);
  
    const $divName = createElement('div', 'name');
    $divName.innerText = name;
    $divProgressbar.appendChild($divName);
  
    const $playerImage = createElement('img');
    $playerImage.src = img;
    $divCharacter.appendChild($playerImage);
  
    return $divPlayer
  };

  export default createPlayer