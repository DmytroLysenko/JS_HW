import menuItem from '../templates/menu-item.hbs';
import dataMenu from '../menu.json';

export default function createMenu(target) {
  const menuMarkup = dataMenu.reduce(
    (total, el) => (total += menuItem(el)),
    '',
  );
  target.insertAdjacentHTML('beforeend', menuMarkup);
}
