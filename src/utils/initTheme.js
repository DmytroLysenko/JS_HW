import { loadLocalStorage, saveLocalStorage } from './localstorage';

const targetElem = document.body;
const controlElem = document.querySelector('input.js-switch-input');
const Theme = {
  KEY: 'theme',
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

export default function init() {
  if (!loadLocalStorage(Theme.KEY) || loadLocalStorage(Theme.KEY) === Theme.LIGHT) {
    targetElem.classList.add(`${Theme.LIGHT}`);
    controlElem.checked = false;
  } else {
    targetElem.classList.add(`${Theme.DARK}`);
    controlElem.checked = true;
  }
  controlElem.addEventListener('change', handleTheme);
}

function handleTheme(e) {
  const value = e.target.checked ? Theme.DARK : Theme.LIGHT;

  switch (value) {
    case Theme.DARK:
      targetElem.classList.replace(`${Theme.LIGHT}`, `${Theme.DARK}`);
      break;
    case Theme.LIGHT:
      targetElem.classList.replace(`${Theme.DARK}`, `${Theme.LIGHT}`);
      break;
  }

  saveLocalStorage(Theme.KEY, value);
}
