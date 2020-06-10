import _fetch from './fetchModule';
import viewerTemplate from '../templates/viewerTemplate.hbs';
import alert from './PNotify';
import refs from './refs';

export default {
  handle() {
    const scrollPosition = refs.viewer.offsetHeight + refs.viewer.offsetTop;

    this.insertData(refs.viewer);

    setTimeout(() => {
      scrollTo({
        top: scrollPosition,
        left: 0,
        behavior: 'smooth',
      });
    }, 2000);
  },

  async insertData(element) {
    try {
      const data = await _fetch.Data(_fetch.urlString);
      if (!data.length) {
        alert('sorry :( nothing was found. Try change search query.');
        return;
      }
      const markup = viewerTemplate(data);
      element.insertAdjacentHTML('beforeend', markup);
      this.show();
    } catch {
      e => console.warn(e);
    }
  },

  reset(e) {
    _fetch.resetPage();
    const searchQuery = e.target.elements.query.value;
    _fetch.searchQueryString = searchQuery;
  },

  show() {
    refs.loadMoreBtn.removeAttribute('hidden');
  },

  hide() {
    refs.loadMoreBtn.setAttribute('hidden', true);
  },
};
