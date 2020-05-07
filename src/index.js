import './css/styles.css';
import createMenuTo from './utils/createMenuTo';
import initTheme from './utils/initTheme';

const menu = document.querySelector('ul.js-menu');
createMenuTo(menu);
initTheme();