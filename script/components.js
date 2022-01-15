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
			d="M36.4839 10H163.516L175 130H25L36.4839 10Z"
			fill="#23C646"
		/>
		<path
			class="sticker sticker-bottom"
			d="M44.4839 190H155.516L175 130H25L44.4839 190Z"
			fill="#FF124B"
		/>
		
	</svg>
	`;
	return element;
}
