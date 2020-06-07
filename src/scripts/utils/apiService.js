import viewerImg from '../../templates/viewerImages.hbs';
import searchField from '../../templates/searchField.hbs';
import '../../../node_modules/material-icons/iconfont/material-icons.css';
const basicLightbox = require('basiclightbox');
const InfiniteScroll = require('infinite-scroll');

export default class Pixabay {
  constructor(selector) {
    this.KEY = '16887620-e991db8737f2bb3a88bca8c81';
    this.BASE_URL = 'https://pixabay.com/api/';
    this.page = 1;
    this.PER_PAGE = 12;
    this.selector = selector;
    this.init();
  }

  init() {
    const container = document.querySelector(this.selector);
    const markup = searchField();
    container.innerHTML = markup;
    const form = container.querySelector('#search-form');
    form.addEventListener('submit', this.handleSubmit.bind(this));
    const viewer = document.querySelector('.viewer');
    viewer.addEventListener('click', this.handleClick);

    const infScroll = new InfiniteScroll('.viewer', {
      // options
      path: '.pagination__next',
      append: '.post',
      history: false,
    });
  }

  handleClick(e) {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    basicLightbox
      .create(
        `
      <img src="${e.target.dataset.large}" width="800" height="600">
      `,
      )
      .show();
  }

  handleSubmit(e) {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value;
    if (!searchQuery) {
      this.clearViewer();
      return;
    }
    this.clearViewer();
    const searchString = searchQuery.split(' ').join('+');
    this.getData(searchString);
  }

  getData(searchQuery) {
    const urlQuery = `${this.BASE_URL}?key=${this.KEY}&q=${searchQuery}&per_page=${this.PER_PAGE}&page=${this.page}`;
    fetch(urlQuery)
      .then(j => j.json())
      .then(data => {
        const markup = viewerImg(data.hits);
        const viewer = document.querySelector('.viewer');
        viewer.insertAdjacentHTML('beforeend', markup);
      })
      .catch(e => console.warn(e));
  }

  clearViewer() {
    const viewer = document.querySelector('.viewer');
    viewer.innerHTML = '';
    this.page = 1;
  }
}
