'use strict';

const img = document.querySelector('.image-wrapper img');

let hData = getSizeData(window.getComputedStyle(img).getPropertyValue('height'));
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

window.addEventListener('load',  () => {
  img.addEventListener('dblclick', () => {
    zoomToggle = !zoomToggle;
    if (zoomToggle) {
      img.style.cursor = 'zoom-out';
      img.style.width = `${wData.size * 2}${wData.unit}`;
      img.style.height = `${hData.size * 2}${wData.unit}`;
  
    }
    else {
      img.style.cursor = 'zoom-in';
      img.style.width = `${wData.size}${wData.unit}`;
      img.style.transform = 'translate(0%, 0%)';
    }
  });
  img.addEventListener('touchstart', (e) => {
    if (zoomToggle) {
      img.draggable = false;
      coords.x = e.touches[0].clientX;
      coords.y = e.touches[0].clientY;
  
      img.addEventListener('touchmove', move)
      window.addEventListener('touchend', () => {
        img.removeEventListener('touchmove', move);
        coords.ex = coords.dx;
        coords.ey = coords.dy;
      });
    }
  }, {
    passive: true,
  });
})


function move(e) {
  e.preventDefault();
	coords.dx = e.touches[0].clientX - coords.x + coords.ex;
	coords.dy = e.touches[0].clientY - coords.y + coords.ey;
	//coords.ex = 0;
	//coords.ey = 0;
	img.style.transform = `translate(${checkBorder(coords.dx / 4)}%, ${checkBorder(coords.dy / 4)}%)`
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