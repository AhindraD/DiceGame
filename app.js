let scores, roundScore, activePlayer, gamePlaying, prevDice1, prevDice2;
const inputScore = 50;
init();
function btn() {
  if (gamePlaying) {

    let dice1 = Math.ceil(Math.random() * 6);
    let dice2 = Math.ceil(Math.random() * 6);

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    // changing the dice image src
    document.getElementById('dice-1').src = `images/dice-${dice1}.png`;
    document.getElementById('dice-2').src = `images/dice-${dice2}.png`;

    // 3. update the round score IF the rolled number is NOT a 1 && if didn't roll double 6 twice
    if (prevDice1 === 6 && prevDice2 === 6 && dice1 === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      // update UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // next player
      window.alert("You Rolled 1's! Score Nuked!")
      nextPlayer();
    }

    prevDice1 = dice1;
    prevDice2 = dice2;

  }

}
document.querySelector('.btn-roll').addEventListener('click', btn);




// button hold - hold the score and change active player
document.querySelector('.btn-hold').addEventListener('click', function () { // anonymous function
  if (gamePlaying) {

    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= inputScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // Next player if there's no winner
      nextPlayer();
    }
  }

});


function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  prevDice1 = prevDice2 = 0;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
};


// new game button
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; 
  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';


  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');

};