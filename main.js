const $divArenas = document.querySelector('.arenas');
const $fightForm = document.querySelector('.control')
const $chat = document.querySelector('.chat')

const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

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

function showMeTheWinner(name) {

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

function enemyChoise() {
  const hit = ATTACK[getRandomFrom1to(3) - 1]
  const defence = ATTACK[getRandomFrom1to(3) - 1]
  return {
    value: getRandomFrom1to(HIT[hit]),
    hit,
    defence
  }
}

function playerChoise() {
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

function calculateCurrentTime() {
  const date = new Date
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function addChatElement(text) {
  const el = `<p>${text}</p>`
  $chat.insertAdjacentHTML('afterbegin', el)
}

function calculateRawText(type, player1, player2) {
  switch (type) {
    case 'start':
      return logs[type].replace('[player1]', player1).replace('[player2]', player2).replace('[time]', calculateCurrentTime())
    case 'draw':
      return logs[type]
    case 'end':
      return logs[type][getRandomFrom1to(logs[type].length - 1)].replace('[playerWins]', player1).replace('[playerLose]', player2)
    case 'hit':
      return logs[type][getRandomFrom1to(logs[type].length - 1)].replace('[playerKick]', player1).replace('[playerDefence]', player2)
    case 'defence':
      return logs[type][getRandomFrom1to(logs[type].length - 1)].replace('[playerKick]', player1).replace('[playerDefence]', player2)
  }
}

function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    $fightForm.disabled = true;
    createReloadButton()
  }

  if (player1.hp === 0 && player2.hp != 0) {
    $divArenas.appendChild(showMeTheWinner(player2.name))
    const winText = calculateRawText('end', player2.name, player1.name)
    addChatElement(winText)
  } else if (player2.hp === 0 && player1.hp != 0) {
    $divArenas.appendChild(showMeTheWinner(player1.name))
    const winText = calculateRawText('end', player1.name, player2.name)
    addChatElement(winText)
  } else if (player1.hp === 0 && player2.hp === 0) {
    $divArenas.appendChild(showMeTheWinner())
    const drawText = calculateRawText('draw')
    addChatElement(drawText)
  }
}

$fightForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const enemy = enemyChoise()
  const player = playerChoise()

  if (enemy.hit != player.defence) {
    player1.changeHp(enemy.value)
    player1.renderHP(player1.elHP());

    const hitText = `${calculateCurrentTime()} ${calculateRawText('hit', player2.name, player1.name)} [-${enemy.value}] [${player1.hp}]`
    addChatElement(hitText)
  } else {
    const blockText = `${calculateCurrentTime()} ${calculateRawText('defence', player2.name, player1.name)}`
    addChatElement(blockText)
  }

  if (player.hit != enemy.defence) {
    player2.changeHp(player.value)
    player2.renderHP(player2.elHP());
    const hitText = `${calculateCurrentTime()} ${calculateRawText('hit', player1.name, player2.name)} [-${player.value}] [${player2.hp}]`
    addChatElement(hitText)
  } else {
    const blockText = `${calculateCurrentTime()} ${calculateRawText('defence', player1.name, player2.name)}`
    addChatElement(blockText)
  }

  showResult()

})

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));
const startText = calculateRawText('start', player1.name, player2.name)
addChatElement(startText)