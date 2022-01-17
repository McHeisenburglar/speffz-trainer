import { newSequence, shuffle, LETTERS } from './helper.js';
import { cornerPiece } from './components.js';

const frame = document.getElementsByClassName('piece-frame')[0];

let scores = {
	correct: 0,
	incorrect: 0,
};

let sequence = newSequence();
let index = 0;
let getCurrentSticker = () => sequence[index];

function resetSequence() {
	sequence = newSequence();
	index = 0;
}

function resetScores() {
	scores.correct = 0;
	scores.incorrect = 0;
}

function startNewGame() {
	resetSequence();
	resetScores();
	render();
}

function render() {
	renderCurrentPiece();
	renderScores();
}

function renderScores() {
	$('#content-correct').text(scores.correct);
	$('#content-incorrect').text(scores.incorrect);
}

function renderPiece(sticker) {
	frame.innerHTML = '';
	frame.appendChild(cornerPiece(sticker));
}
function renderCurrentPiece() {
	renderPiece(sequence[index]);
}
function increment() {
	index++;
	if (index === sequence.length) {
		sequence = newSequence();
		index = 0;
	}
}
function nextPiece() {
	increment();
	renderCurrentPiece();
}

function replaceLetter(newLetter) {
	const content = newLetter ? newLetter.toUpperCase() : '?';
	$('#content-letter').text(content);
}

function addCorrect() {
	scores.correct++;
}
function addIncorrect() {
	scores.incorrect++;
}

function isGuessCorrect(letter) {
	return letter.toLowerCase() === getCurrentSticker();
}

function styleLetter(status) {
	$('h1#content-letter').removeClass();
	$('h1#content-letter').addClass(`letter status-${status}`);
}

function resetLetter() {
	$('h1#content-letter').text('?');
	$('h1#content-letter').removeClass();
	$('h1#content-letter').addClass(`letter status-pending`);
}

window.addEventListener('keypress', (e) => {
	const letter = e.key.toLowerCase();
	if (LETTERS.includes(letter)) {
		replaceLetter(letter);
		if (isGuessCorrect(letter)) {
			addCorrect();
			styleLetter('correct');
			setTimeout(() => {
				nextPiece();
				resetLetter();
			}, 200);
		} else {
			addIncorrect();
			styleLetter('incorrect');
		}
	}
	render();
});

function reveal() {
	const answer = getCurrentSticker();
	replaceLetter(answer);
	styleLetter('correct');
	render();

	setTimeout(() => {
		replaceLetter();
		styleLetter('pending');
		nextPiece();
	}, 1000);
}

window.addEventListener('load', startNewGame);
$('.button-reset').on('click', startNewGame);
$('.button-reveal').on('click', reveal);
$('.button-next').on('click', nextPiece);
