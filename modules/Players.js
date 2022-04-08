export const player1 = {
    player: 1,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    changeHp,
    elHP,
    renderHP,
  };
  
  export const player2 = {
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    changeHp,
    elHP,
    renderHP,
  };

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