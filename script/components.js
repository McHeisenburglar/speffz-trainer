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
