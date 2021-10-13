'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnDice = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0')
const current1 = document.getElementById('current--1')
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

let score, currentScore, activePlayer, playing

const init = function () {
    playing = true
    currentScore = 0
    activePlayer = 0
    score = [0, 0]

    current0.textContent = 0
    current1.textContent = 0
    score0El.textContent = 0
    score1El.textContent = 0

    diceEl.classList.add('hidden')

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')

    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
}
init()

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

btnDice.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1

        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`

        if (dice !== 1) {
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            // Switching player
            switchPlayer()
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing) {
        score[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer]
        if (score[activePlayer] >= 20) {
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            diceEl.classList.add('hidden')
        } else {
            switchPlayer()
        }
    }
})

btnNew.addEventListener('click', init)


