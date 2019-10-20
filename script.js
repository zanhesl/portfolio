document.querySelector(`.edu-opener`).addEventListener(`click`, function(evt) {
  if (!(document.querySelector(`.edu-points`).style.display)||(document.querySelector(`.edu-points`).style.display == `none`)) {
    document.querySelector(`.edu-points`).style.display = `flex`;
  } else {
    document.querySelector(`.edu-points`).style.display = `none`;
  }
});

document.querySelector(`.desc-opener`).addEventListener(`click`, function(evt) {
  if (!(document.querySelector(`.description-points`).style.display)||(document.querySelector(`.description-points`).style.display == `none`)) {
    document.querySelector(`.description-points`).style.display = `block`;
  } else {
    document.querySelector(`.description-points`).style.display = `none`;
  }
});

document.querySelector(`.desc-opener-1`).addEventListener(`click`, function(evt) {
  if (!(document.querySelector(`.description-points-1`).style.display)||(document.querySelector(`.description-points-1`).style.display == `none`)) {
    document.querySelector(`.description-points-1`).style.display = `block`;
  } else {
    document.querySelector(`.description-points-1`).style.display = `none`;
  }
});

window.onresize = function (evt) {
  if (document.documentElement.clientWidth > 800) {
    document.querySelector(`.description-points`).style.display = `block`;
    document.querySelector(`.description-points-1`).style.display = `block`;
  } else {
    document.querySelector(`.description-points`).style.display = `none`;
    document.querySelector(`.description-points-1`).style.display = `none`;
  }
}

const images = document.querySelectorAll(`.item`);
let currentItem = 0;
let canSwitch = true;

function changeItem(n) {
  currentItem = (n + images.length) % images.length;
}

function previousItem(n) {
  hideItem(`to-right`);
  changeItem(n - 1);
  showItem(`from-left`);
}

function nextItem(n) {
  hideItem(`to-left`);
  changeItem(n + 1);
  showItem(`from-right`);
}

function hideItem(direction) {
  canSwitch = false;
  images[currentItem].classList.add(direction);
  images[currentItem].addEventListener(`animationend`, function(evt) {
    this.classList.remove(`active`, direction);
  });
}

function showItem(direction) {
  images[currentItem].classList.add(`next`, direction);
  images[currentItem].addEventListener(`animationend`, function(evt) {
    this.classList.remove(`next`, direction);
    this.classList.add(`active`);
    canSwitch = true;
  });
}

document.querySelector(`.arrow.left`).addEventListener(`click`, function(evt) {
  if (canSwitch) {
    previousItem(currentItem);
  }
});

document.querySelector(`.arrow.right`).addEventListener(`click`, function(evt) {
  if (canSwitch) {
    nextItem(currentItem);
  }
});

const swipedetect = (el) => {

	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 200;
	let allowedTime = 800;

	surface.addEventListener('mousedown', function(e){
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (canSwitch) {
						previousItem(currentItem);
					}
				} else {
					if (canSwitch) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
			if (e.target.classList.contains('left')) {
				if (canSwitch) {
					previousItem(currentItem);
				}
			} else {
				if (canSwitch) {
					nextItem(currentItem);
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
							if ((distX > 0)) {
								if (canSwitch) {
									previousItem(currentItem);
								}
							} else {
								if (canSwitch) {
									nextItem(currentItem);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

const el = document.querySelector('.slider');
swipedetect(el);
