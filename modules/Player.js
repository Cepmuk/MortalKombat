import createElement from './createElement.js'

class Player {
  constructor(props) {
    this.player = props.player
    this.name = props.name
    this.hp = props.hp
    this.img = props.img
    this.selector = `player${this.player}`
  }

  changeHp = (hit) => {
    this.hp -= hit;
    if (this.hp < 0) {
      this.hp = 0;
    };
  }

  elHP = () => document.querySelector(`.${this.selector} .life`)

  renderHP = ($playerLife) => $playerLife.style.width = `${this.hp}%`;

  createPlayer = () => {

    const $divPlayer = createElement('div', this.selector)

    const $divProgressbar = createElement('div', 'progressbar');
    $divPlayer.appendChild($divProgressbar);

    const $divCharacter = createElement('div', 'character');
    $divPlayer.appendChild($divCharacter);

    const $divLife = createElement('div', 'life');
    $divLife.style.width = `${this.hp}%`;
    $divProgressbar.appendChild($divLife);

    const $divName = createElement('div', 'name');
    $divName.innerText = this.name;
    $divProgressbar.appendChild($divName);

    const $playerImage = createElement('img');
    $playerImage.src = this.img;
    $divCharacter.appendChild($playerImage);

    return $divPlayer
  };
}

export default Player