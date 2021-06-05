//HomeWork #2 Task #0

const player1 = {
    name : 'Sub-Zero',
    hp : 100,
    img : 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon : ['ice', 'sword', 'AK-47'],
    attack : function () {
        console.log (this.name + ' Fight...')
    },
};

const player2 = {
  name : 'Scorpion',
  hp : 100,
  img : 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon : ['ice', 'sword', 'AK-47'],
  attack : function () {
      console.log (this.name + ' Fight...')
  },
};

//HomeWork #2 Task #1

const $divArenas = document.querySelector('.arenas');

function createPlayer (player, playerPers, hp = '100%') {

  const $divPlayer = document.createElement('div');
  $divPlayer.classList.add(player);
  $divArenas.appendChild($divPlayer);

  const $divProgressbar = document.createElement('div');
  $divProgressbar.classList.add('progressbar');
  $divPlayer.appendChild($divProgressbar);

  const $divCharacter = document.createElement('div');
  $divCharacter.classList.add('character');
  $divPlayer.appendChild($divCharacter);

  const $divLife = document.createElement('div');
  $divLife.classList.add('life');
  $divLife.style.width = hp;
  $divProgressbar.appendChild($divLife);

  const $divName = document.createElement('div');
  $divName.classList.add('name');
  $divName.innerText = playerPers.name;
  $divProgressbar.appendChild($divName);

  const $playerImage = document.createElement('img');
  $playerImage.src = playerPers.img;
  $divCharacter.appendChild($playerImage);
};

//HomeWork #2 Task #2 Task #3

createPlayer('player1', player1, '50%');
createPlayer('player2', player2);