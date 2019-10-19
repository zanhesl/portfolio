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
