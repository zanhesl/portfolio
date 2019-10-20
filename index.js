document.querySelector(`.go-to-mobile`).addEventListener(`click`, function(evt) {
  const content = document.querySelector(`iframe`);
  const bodyType = document.querySelector(`body`);
  const resolution = (bodyType.classList.value.indexOf(`yallow`) >= 0) ? `640px` : `375px`;
  if (!(content.style.width)||(content.style.width == `100%`)){
    content.style.width = resolution;
    document.querySelector(`.go-to-mobile`).innerHTML = `<p>Desktop</p>`;
  } else {
    content.style.width = `100%`;
    document.querySelector(`.go-to-mobile`).innerHTML = `<p>Mobile</p>`;
  }

});
