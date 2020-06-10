const InfiniteScroll = require('infinite-scroll');
import viewerTemplate from '../templates/viewerTemplate.hbs';
import refs from './refs';

import options from './fetchOptions';
const { PROXY, BASE_URL, KEY, PER_PAGE } = options;

let infScroll = null;

export default {
  run(searchQuery) {
    infScroll = new InfiniteScroll(refs.viewer, {
      path() {
        return `${PROXY}${BASE_URL}?key=${KEY}&q=${searchQuery}&per_page=${PER_PAGE}&page=${this.pageIndex}`;
      },
      responseType: 'text',
      history: false,
    });
    infScroll.on('load', response => {
      const data = JSON.parse(response);
      const markup = viewerTemplate(data.hits);
      const proxyElem = document.createElement('div');
      proxyElem.innerHTML = markup;
      const items = proxyElem.querySelectorAll('.photo-card');
      infScroll.appendItems(items);
    });
    infScroll.loadNextPage();
  },
  stop() {
    infScroll.destroy();
  },
  get isRun() {
    return infScroll ? true : false;
  },
  get instance() {
    return infScroll;
  },
};
