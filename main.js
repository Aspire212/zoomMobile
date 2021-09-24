'use strict';

class ZoomMobile {
	constructor(img) {
		this.img = img;
		this.hData = this.getSizeData(window.getComputedStyle(this.img).getPropertyValue('height'));
		this.wData = this.getSizeData(window.getComputedStyle(this.img).getPropertyValue('width'));
		this.zoomToggle = false;
		this.coords = {
			x: 0,
			y: 0,
			dx: 0,
			dy: 0,
			ex: 0,
			ey: 0,
		};
		this.img.addEventListener('dblclick', () => {
			this.zoomToggle = !this.zoomToggle;
			if (this.zoomToggle) {
					this.img.style.width = `${this.wData.size * 2}${this.wData.unit}`;
					this.img.style.height = `${this.hData.size * 2}${this.wData.unit}`;
			} else {
					this.img.style.width = `${this.wData.size}${this.wData.unit}`;
					this.img.style.height = `${this.hData.size}${this.hData.unit}`;
					this.img.style.transform = 'translate(0%, 0%)';
			}
		});
		this.img.addEventListener('touchstart', (e) => {
			if (this.zoomToggle) {
					this.img.draggable = false;
					this.coords.x = e.touches[0].clientX;
					this.coords.y = e.touches[0].clientY;
					this.img.addEventListener('touchmove', this.move)
					window.addEventListener('touchend', () => {
						this.img.removeEventListener('touchmove', this.move);
						this.coords.ex = this.coords.dx;
						this.coords.ey = this.coords.dy;
					});
				}
		}, {
			passive: true,
		});
	}
	move = (e) => {
		e.preventDefault();
		this.coords.dx = e.touches[0].clientX - this.coords.x + this.coords.ex;
		this.coords.dy = e.touches[0].clientY - this.coords.y + this.coords.ey;
		this.img.style.transform = `translate(${this.checkBorder(this.coords.dx / 4)}%, ${this.checkBorder(this.coords.dy / 4)}%)`
	}
	getSizeData(data) {
		let size = parseInt(data);
		let unit = data.slice(String(size).length);
		return {
			size,
			unit
		};
	}
	checkBorder(coord) {
		if (coord >= 25) return 25;
		else if (coord <= -25) return -25;
		else return coord;
	}
}
window.addEventListener('load', () => new ZoomMobile(document.querySelector('.image-wrapper img')));



// const img = document.querySelector('.image-wrapper img');

// let hData = getSizeData(window.getComputedStyle(img).getPropertyValue('height'));
// let wData = getSizeData(window.getComputedStyle(img).getPropertyValue('width'));

// let zoomToggle = false;

// const coords = {
// 	x: 0,
// 	y: 0,
// 	dx: 0,
// 	dy: 0,
// 	ex: 0,
// 	ey: 0,
// }

// window.addEventListener('load',  () => {
//   img.addEventListener('dblclick', () => {
//     zoomToggle = !zoomToggle;
//     if (zoomToggle) {
//       img.style.cursor = 'zoom-out';
//       img.style.width = `${wData.size * 2}${wData.unit}`;
//       img.style.height = `${hData.size * 2}${wData.unit}`;
  
//     }
//     else {
//       img.style.cursor = 'zoom-in';
//       img.style.width = `${wData.size}${wData.unit}`;
//       img.style.transform = 'translate(0%, 0%)';
//     }
//   });
//   img.addEventListener('touchstart', (e) => {
//     if (zoomToggle) {
//       img.draggable = false;
//       coords.x = e.touches[0].clientX;
//       coords.y = e.touches[0].clientY;
  
//       img.addEventListener('touchmove', move)
//       window.addEventListener('touchend', () => {
//         img.removeEventListener('touchmove', move);
//         coords.ex = coords.dx;
//         coords.ey = coords.dy;
//       });
//     }
//   }, {
//     passive: true,
//   });
// })


// function move(e) {
//   e.preventDefault();
// 	coords.dx = e.touches[0].clientX - coords.x + coords.ex;
// 	coords.dy = e.touches[0].clientY - coords.y + coords.ey;
// 	//coords.ex = 0;
// 	//coords.ey = 0;
// 	img.style.transform = `translate(${checkBorder(coords.dx / 4)}%, ${checkBorder(coords.dy / 4)}%)`
// }



// function getSizeData(data) {
// 	let size = parseInt(data);
// 	let unit = data.slice(String(size).length);
// 	return {size, unit};
// }

// function checkBorder(coord) {
// 	if (coord >= 25) return 25;
// 	else if (coord <= -25) return -25;
// 	else return coord;
// }