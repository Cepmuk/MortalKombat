const $divArenas = document.querySelector('.arenas');
const $fightForm = document.querySelector('.control')

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
  player: 1,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['ice', 'sword', 'AK-47'],
  attack: function () {
    console.log(this.name + ' Fight...')
  },
  changeHp,
  elHP,
  renderHP,
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
  changeHp,
  elHP,
  renderHP,
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

function getRandomFrom1to(max) {
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
  const $reloadButton = createElement('button', 'button')
  $reloadButton.innerText = 'Restart'
  $reloadWrap.appendChild($reloadButton)
  document.querySelector('.root').appendChild($reloadWrap)

  $reloadButton.addEventListener('click', function () {
    window.location.reload()
  })

  return $reloadButton
}

function enemyAtack() {
  const hit = ATTACK[getRandomFrom1to(3) - 1]
  const defence = ATTACK[getRandomFrom1to(3) - 1]
  return {
    value: getRandomFrom1to(HIT[hit]),
    hit,
    defence
  }
}

function recalculateHP (playerN, atackValue) {
  playerN.changeHp(atackValue)
  playerN.renderHP(playerN.elHP());
}

$fightForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const enemy = enemyAtack()
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

  if (enemy.hit != playerChoise.defence) {
    recalculateHP(player1, enemy.value)
  }

  if (playerChoise.hit != enemy.defence) {
    recalculateHP(player2, playerChoise.value)
  }

  if (player1.hp === 0 || player2.hp === 0) {
    $fightForm.disabled = true;
    createReloadButton()

  }

  if (player1.hp === 0 && player2.hp != 0) {
    $divArenas.appendChild(showResult(player2.name))
  } else if (player2.hp === 0 && player1.hp != 0) {
    $divArenas.appendChild(showResult(player1.name))
  } else if (player1.hp === 0 && player2.hp === 0) {
    $divArenas.appendChild(showResult())
  }

})

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));