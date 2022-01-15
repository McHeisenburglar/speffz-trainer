import { newSequence, shuffle, LETTERS } from './helper.js';
import { edgePiece } from './components.js';

const frame = document.getElementsByClassName('piece-frame')[0];

let pieceType = 'edge';

let scores = {
	correct: 0,
	incorrect: 0,
};

let sequence = newSequence();
let index = 0;

let guess = {
	left: null,
	right: null,
};

const getCurrentStickers = () => {
	return { left: sequence[index], right: sequence[index + 1] };
};
function resetSequence() {
	sequence = newSequence();
	index = 0;
}

function resetScores() {
	scores.correct = 0;
	scores.incorrect = 0;
}

function resetGuesses() {
	guess.left = null;
	guess.right = null;
}

function startNewGame() {
	resetSequence();
	resetScores();
	resetGuesses();
	resetStyles();
	render();
}

function render() {
	renderCurrentPieces();
	renderScores();
	renderLetters();
}

function renderScores() {
	$('#content-correct').text(scores.correct);
	$('#content-incorrect').text(scores.incorrect);
}

function renderPiece(sticker) {
	frame.appendChild(edgePiece(sticker));
}
function renderCurrentPieces() {
	frame.innerHTML = '';
	renderPiece(sequence[index]);
	renderPiece(sequence[index + 1]);
}
function increment() {
	index += 2;
	if (index >= sequence.length) {
		console.log('🎉 New sequence');
		sequence = newSequence();
		index = 0;
	}
}
function nextPieces() {
	increment();
	render();
}

function replaceLetter(side) {
	const content = guess[side] ? guess[side].toUpperCase() : '?';
	$(`#content-letter-${side}`).text(content);
}

function addCorrect() {
	scores.correct++;
}
function addIncorrect() {
	scores.incorrect++;
}

function renderLetters() {
	replaceLetter('left');
	replaceLetter('right');
}

function isGuessCorrect() {
	const target = getCurrentStickers();
	return guess.left === target.left && guess.right === target.right;
}

function styleLetter(side, style) {
	$(`h1.letter.${side}`)
		.removeClass('status-normal status-incorrect status-correct status-pending')
		.addClass(`status-${style}`);
}
function resetStyles() {
	styleLetter('left', 'pending');
	styleLetter('right', 'pending');
}

window.addEventListener('keypress', (e) => {
	const letter = e.key.toLowerCase();

	if (LETTERS.includes(letter)) {
		if (guess.left && guess.right) {
			resetGuesses();
			resetStyles();
		}
		if (!guess.left) {
			guess.left = letter;
			styleLetter('left', 'normal');
		} else if (!guess.right) {
			guess.right = letter;
			styleLetter('right', 'normal');
		}

		if (guess.left && guess.right) {
			if (isGuessCorrect()) {
				addCorrect();
				styleLetter('left', 'correct');
				styleLetter('right', 'correct');
				setTimeout(() => {
					resetGuesses();
					resetStyles();
					nextPieces();
				}, 300);
			} else {
				addIncorrect();
				styleLetter('left', 'incorrect');
				styleLetter('right', 'incorrect');
			}
		}
	}
	render();
});

function reveal() {
	const answer = getCurrentStickers();
	guess.left = answer.left;
	guess.right = answer.right;
	styleLetter('left', 'correct');
	styleLetter('right', 'correct');
	render();

	setTimeout(() => {
		resetGuesses();
		resetStyles();
		nextPieces();
	}, 1000);
}

window.addEventListener('load', startNewGame);
$('.button-reset').on('click', startNewGame);
$('.button-next').on('click', nextPieces);
$('.button-reveal').on('click', reveal);
