'use strict';
const img = document.querySelector('.image-wrapper img');

//let hData = getSizeData(window.getComputedStyle(img).getPropertyValue('height'));
let wData = getSizeData(window.getComputedStyle(img).getPropertyValue('width'));

let zoomToggle = false;

const coords = {
	x: 0,
	y: 0,
	dx: 0,
	dy: 0,
	ex: 0,
	ey: 0,
}


img.addEventListener('click', () => {
	zoomToggle = !zoomToggle;
	if (zoomToggle) {
		img.style.cursor = 'zoom-out';
		img.style.width = `${wData.size * 2}${wData.unit}`;
	}
	else {
		img.style.cursor = 'zoom-in';
		img.style.width = `${wData.size}${wData.unit}`;
		img.style.transform = 'translate(0%, 0%)';
	}
});
img.addEventListener('mousedown', (e) => {
	if (zoomToggle) {
		img.draggable = false;
		coords.x = e.clientX;
		coords.y = e.clientY;

		img.addEventListener('mousemove', move)
		window.addEventListener('mouseup', () => {
			img.removeEventListener('mousemove', move);
			coords.ex = coords.dx;
			coords.ey = coords.dy;
		});
	}
});

function move(e) {
	zoomToggle = false;
	coords.dx = e.clientX - coords.x + coords.ex;
	coords.dy = e.clientY - coords.y + coords.ey;
	console.log(coords.dx, coords.dy)
	img.style.transform = `translate(${checkBorder(coords.dx / 2)}%, ${checkBorder(coords.dy / 2)}%)`
}



function getSizeData(data) {
	let size = parseInt(data);
	let unit = data.slice(String(size).length);
	return {size, unit};
}

function checkBorder(coord) {
	if (coord >= 25) return 25;
	else if (coord <= -25) return -25;
	else return coord;
}