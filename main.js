const $divArenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['ice', 'sword', 'AK-47'],
  attack: function () {
    console.log (this.name + ' Fight...')
  },
};

const player2 = {
  player: 2,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['ice', 'sword', 'AK-47'],
  attack: function () {
    console.log (this.name + ' Fight...')
  },
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  };

  return $tag;
};

function createPlayer (playerPers) {

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

function randomFrom1toMax (max) {
  
  return Math.ceil(Math.random()*max);
}

function changeHp (player){
  const $playerLife = document.querySelector('.player' + player.player + ' .life');
  player.hp -= randomFrom1toMax(20);
  if (player.hp < 0) {
    player.hp = 0;
  };

  $playerLife.style.width = player.hp + '%';

  if (player.hp === 0) {
    if (player.player === 1) {
    $divArenas.appendChild(playerLose(player2.name))
  } else {
    $divArenas.appendChild(playerLose(player1.name))
  }
}
};

function playerLose (name) {
  const $loseTitle = createElement('div', 'loseTitle'); 
  $loseTitle.innerText = name + ' wins';

  $randomButton.disabled = true;

  return $loseTitle
};

$randomButton.addEventListener('click', function (){
  console.log('1: '+ player1.hp + ' 2: '+ player2.hp);
  changeHp (player1);
  changeHp (player2);
}
);

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));