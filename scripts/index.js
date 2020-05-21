import colors from './colorData.js';
const control = document.querySelector('.control');
const startBtn = control.querySelector('button[data-action="start"]');
const stopBtn = control.querySelector('button[data-action="stop"]');
const body = document.body;


control.addEventListener('click', handleControl);
stopBtn.setAttribute('disabled', true);

function handleControl(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  switch (e.target.dataset.action) {
    case 'start':
      startAction();
      break;
    case 'stop':
      stopAction();
      break;
    default:
      throw new Error('Check HTML - Wrong button!');
  }
}

let interval = null;

function startAction() {
  startBtn.toggleAttribute('disabled');
  stopBtn.toggleAttribute('disabled');
  interval = setInterval(changeColor, 1000, body, colors);
}

function stopAction() {
  stopBtn.toggleAttribute('disabled');
  startBtn.toggleAttribute('disabled');
  clearInterval(interval);
}

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function changeColor(target, colors) {
  const color = randomIntegerFromInterval(0, colors.length);
  target.bgColor = `${colors[color]}`;
}
