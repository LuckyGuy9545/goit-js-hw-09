const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
}
let timerId = null;

refs.btnStart.addEventListener('click', onStartClick);
refs.btnStop.addEventListener('click', onStopClick)


function onStartClick() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  timerId = setInterval(() => {
    setBodyBgColor(getRandomHexColor())
  }, 1000);
}

function onStopClick() {
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
  clearInterval(timerId);
}


function setBodyBgColor(color) {
  document.body.style.backgroundColor = color
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
