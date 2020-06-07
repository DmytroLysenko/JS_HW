import viewerTemplate from '../../templates/viewerTemplate.hbs';
import basicTemplate from '../../templates/basicTemplate.hbs';
import modalTemplate from '../../templates/modalTemplate.hbs';

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
    this.refs = {};
    this.searchQuery = '';
    this.init();
  }

  init() {
    this.refs.container = document.querySelector(this.selector);
    const markup = basicTemplate();
    this.refs.container.innerHTML = markup;

    this.refs.paginationNext = document.querySelector('.pagination__next');
    this.refs.form = document.querySelector('#search-form');
    this.refs.viewer = document.querySelector('#viewer');

    this.refs.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.refs.viewer.addEventListener('click', this.openModal);
  }

  openModal(e) {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const largeImgUrl = e.target.dataset.large;
    basicLightbox.create(modalTemplate({ largeImgUrl })).show();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.clearViewer();
    const searchQuery = e.target.elements.query.value;
    if (!searchQuery) {
      return;
    }
    this.searchQuery = searchQuery.split(' ').join('+');
    console.dir(this.refs.paginationNext);
    this.refs.paginationNext.href = this.urlQuery;

    this.infScroll = new InfiniteScroll('#viewer', {
      path: '.pagination__next',
      append: '.photo-card',
      history: false,
      hideNav: '.pagination',
    });
    this.infScroll.loadNextPage();
    // this.loadData();
  }

  get urlQuery() {
    return `${this.BASE_URL}?key=${this.KEY}&q=${this.searchQuery}&per_page=${this.PER_PAGE}&page=${this.page}`;
  }

  loadData() {
    fetch(this.urlQuery)
      .then(j => j.json())
      .then(data => {
        const markup = viewerTemplate(data.hits);
        this.refs.viewer.insertAdjacentHTML('beforeend', markup);
        this.page++;
      })
      .catch(e => console.warn(e));
  }

  // loadNextPage() {
  //   const searchQuery = document.querySelector('#search-form input').value;
  //   const nextPageUrl = `${this.BASE_URL}?key=${this.KEY}&q=${searchQuery}&per_page=${this.PER_PAGE}&page=${this.page}`;
  //   console.log(nextPageUrl);
  //   // const paginationAnchor = document.querySelector('.pagination__next');
  //   // paginationAnchor.href = nextPage;
  // }

  clearViewer() {
    this.refs.viewer.innerHTML = '';
    this.page = 1;
    this.searchQuery = '';
    if (this.infScroll) {
      this.infScroll.destroy();
    }
  }
}
