const $divArenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['ice', 'sword', 'AK-47'],
  attack: function () {
    console.log(this.name + ' Fight...')
  },
  changeHp: changeHp,
  elHP: elHP,
  renderHP: renderHP,
};

const player2 = {
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['ice', 'sword', 'AK-47'],
  attack: function () {
    console.log(this.name + ' Fight...')
  },
  changeHp: changeHp,
  elHP: elHP,
  renderHP: renderHP,
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  };

  return $tag;
};

function createPlayer(playerPers) {

  const $divPlayer = createElement('div', ('player' + playerPers.player))

  const $divProgressbar = createElement('div', 'progressbar');
  $divPlayer.appendChild($divProgressbar);

  const $divCharacter = createElement('div', 'character');
  $divPlayer.appendChild($divCharacter);

  const $divLife = createElement('div', 'life');
  $divLife.style.width = playerPers.hp + '%';
  $divProgressbar.appendChild($divLife);

  const $divName = createElement('div', 'name');
  $divName.innerText = playerPers.name;
  $divProgressbar.appendChild($divName);

  const $playerImage = createElement('img');
  $playerImage.src = playerPers.img;
  $divCharacter.appendChild($playerImage);

  return $divPlayer
};

function randomFrom1toMax(max) {
  return Math.ceil(Math.random() * max);
}

function changeHp(hit) {
  this.hp -= hit;
  if (this.hp < 0) {
    this.hp = 0;
  };
}

function elHP() {
  return document.querySelector('.player' + this.player + ' .life');
}

function renderHP($playerLife) {
  $playerLife.style.width = this.hp + '%';
}

function showResult(name) {

  const $result = createElement('div', 'result');
  if (name) {
    $result.innerText = name + ' wins';
  } else {
    $result.innerText = 'DRAW'
  }

  return $result
};

function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap')
  document.querySelector('.control').appendChild($reloadWrap)
  const $reloadButton = createElement('button', 'button')
  document.querySelector('.reloadWrap').appendChild($reloadButton)
  $reloadButton.innerText = 'Restart'

  return $reloadButton
}

$randomButton.addEventListener('click', function () {
  player1.changeHp(randomFrom1toMax(20))
  player1.renderHP(player1.elHP());
  player2.changeHp(randomFrom1toMax(20))
  player2.renderHP(player2.elHP());

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
    const $reloadButton = createReloadButton()
    $reloadButton.addEventListener('click', function () {
      window.location.reload()
    })
  }

  if (player1.hp === 0 && player2.hp != 0) {
    $divArenas.appendChild(showResult(player2.name))
  } else if (player2.hp === 0 && player1.hp != 0) {
    $divArenas.appendChild(showResult(player1.name))
  } else if (player1.hp === 0 && player2.hp === 0) {
    $divArenas.appendChild(showResult())
  }

}
);

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));