'use strict';
class ZoomInside {
	constructor(img, zoomToggle = false) {
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
		this.ev = {
			mouseEv: true,
			isTouch: 'ontouchstart',
			begin: 'mousedown',
			run: 'mousemove',
			end: 'mouseup',
		};

		if (this.ev.isTouch in document.documentElement) {
			this.ev.mouseEv = false;
			this.ev.begin = 'touchstart';
			this.ev.run = 'touchmove';
			this.ev.end = 'touchend';
		}
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
		this.img.addEventListener(this.ev.begin, (e) => {
			if (this.zoomToggle) {
					this.img.draggable = false;
					this.coords.x = this.ev.mouseEv ? e.clientX : e.touches[0].clientX;
					this.coords.y = this.ev.mouseEv ? e.clientY : e.touches[0].clientY;
					this.img.addEventListener(this.ev.run, this.move, {passive: true});
					window.addEventListener(this.ev.end, () => {
						this.img.removeEventListener(this.ev.run, this.move);
						this.coords.ex = this.coords.dx;
						this.coords.ey = this.coords.dy;
						this.coords.dx = 0;
						this.coords.dy = 0;
					});
				}
		}, {
			passive: true,
		});
	}
	move = (e) => {
		e.preventDefault();
		this.coords.dx = (this.ev.mouseEv? e.clientX : e.touches[0].clientX) - this.coords.x + this.coords.ex;
		this.coords.dy = (this.ev.mouseEv? e.clientY : e.touches[0].clientY) - this.coords.y + this.coords.ey;
		this.img.style.transform = `translate(${this.checkBorder(this.coords.dx/4)}%, ${this.checkBorder(this.coords.dy/4)}%)`;
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
		if (coord >= 0) return  0;
		else if (coord <= -25) return -25;
		else return coord;
	}
}
//window.addEventListener('load', () => new ZoomMobile(document.querySelector('.image-wrapper img')));









const img = document.querySelector('.image-wrapper img');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');

img.addEventListener('click', (e) => {
	if (modal.classList.contains('modal-active')) return;
	modal.prepend(createImage(img.src, 'alt', modal.offsetHeight, 20));
	modal.classList.add('modal-active');
	document.body.style.overflow = 'hidden';
});

modal.addEventListener('click', (e) => {
	if (e.target === e.currentTarget || e.target === closeModal) {
		removeModal();
	}
	else if(e.target.classList.contains('image-modal')) {
		return;
	}
});

window.addEventListener('keydown', (e) => {
	if (e.keyCode === 27 && modal.classList.contains('modal-active')) {
		removeModal();
	}
});

function removeModal() {
	modal.classList.remove('modal-active');
		document.body.style.overflow = 'visible';
		if (!modal.classList.contains('modal-active')){
			setTimeout(() => {
				modal.removeChild(modal.children[0]);
			}, 100);
		}
}

function createImage(src, alt, mH, mP){
	let img = document.createElement('img');
	img.src = src;
	img.alt = alt;
	img.draggable = false;
	img.className = 'image-modal';
	img.style.height = `${mH - mP}px`;
	img.style.width = 'auto';
	img.addEventListener('mouseenter', () => {
		new ZoomInside(img);
	});
	return img;
}
