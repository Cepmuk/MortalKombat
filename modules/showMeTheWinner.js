import createElement from './createElement.js'

const showMeTheWinner = (name) => {

    const $result = createElement('div', 'result');
    if (name) {
      $result.innerText = name + ' wins';
    } else {
      $result.innerText = 'DRAW'
    }
  
    return $result
  };

  export default showMeTheWinner