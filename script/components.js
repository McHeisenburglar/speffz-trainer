export function edgePiece(sticker) {
	const element = document.createElement('div');
	element.classList.add('piece-parent');
	element.innerHTML = `
	<svg
		class="piece edge ${sticker}"
		viewBox="0 0 200 200"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			class="sticker sticker-main"
			d="M36.4839 14H163.516L175 134H25L36.4839 14Z"
			fill="#23C646"
		/>
		<path
			class="sticker sticker-bottom"
			d="M45 186H155L175 134H25L45 186Z"
			fill="#FF124B"
		/>
		
	</svg>
	`;
	return element;
}

export function cornerPiece(sticker) {
	const element = document.createElement('div');
	element.classList.add('piece-parent');
	element.innerHTML = `
	<svg
		class="piece corner ${sticker}"
		viewBox="0 0 200 200"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			class="sticker sticker-primary"
			d="M99.9031 11L179.806 66.9031L99.9031 122.806L20 66.9031L99.9031 11Z"
			fill="white"
		/>
		<path class="sticker sticker-secondary" d="M29 134L100 190V123L20 67L29 134Z" fill="#0797FF" />
		<path class="sticker sticker-tertiary" d="M171 134L100 190V123L180 67L171 134Z" fill="#B822FF" />
	</svg>
		`;
	return element;
}
