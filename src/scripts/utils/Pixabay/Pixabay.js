import fetchPixabayData from './components/fetchPixabayData';

const basicLightbox = require('basiclightbox');

import viewerTemplate from './components/templates/viewerTemplate.hbs';
import basicTemplate from './components/templates/basicTemplate.hbs';
import modalTemplate from './components/templates/modalTemplate.hbs';

import 'material-icons/iconfont/material-icons.css';
import 'basiclightbox/dist/basiclightbox.min.css';
import '../Pixabay/components/styles/PixabayStyles.css';



export default class Pixabay {
  constructor(selector) {
    this.selector = selector;
    this.refs = {};
    this._scrollPosition = 0;
    this.init();
  }

  init() {
    this.refs.container = document.querySelector(this.selector);
    const markup = basicTemplate();
    this.refs.container.innerHTML = markup;

    this.refs.form = document.querySelector('#search-form');
    this.refs.viewer = document.querySelector('#viewer');
    this.refs.loadMoreBtn = document.querySelector('#load-more-btn');

    this.refs.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.refs.loadMoreBtn.addEventListener('click', this.handleLoadMoreBtn.bind(this));
    this.refs.viewer.addEventListener('click', this.handleViewerClick.bind(this));
  }

  set scrollPosition(value) {
    this._scrollPosition = value;
  }

  get scrollPosition() {
    return this._scrollPosition;
  }

  handleLoadMoreBtn(e) {
    this.scrollPosition = this.refs.viewer.offsetHeight + this.refs.viewer.offsetTop;

    this.insertPixabayData(this.refs.viewer);

    setTimeout(() => {
      scrollTo({
        top: this._scrollPosition,
        left: 0,
        behavior: 'smooth',
      });
    }, 1500);
  }

  handleViewerClick(e) {
    const nodeName = e.target.nodeName;
    if (nodeName !== 'IMG') {
      return;
    }
    const largeImgUrl = e.target.dataset.large;
    basicLightbox.create(modalTemplate({ largeImgUrl })).show();
  }

  handleSubmit(e) {
    e.preventDefault();
    requestAnimationFrame(() => {
      this.hideLoadMoreBtn();
      this.clearViewer();
    });
    fetchPixabayData.resetPage();

    const searchQuery = e.target.elements.query.value;
    if (!searchQuery) {
      return;
    }

    fetchPixabayData.searchQueryString = searchQuery;

    this.insertPixabayData(this.refs.viewer);
  }

  async insertPixabayData(element) {
    try {
      const data = await fetchPixabayData.fetchData(fetchPixabayData.urlString);
      if (!data.length) {
        return;
      }
      const markup = viewerTemplate(data);
      element.insertAdjacentHTML('beforeend', markup);
      this.showLoadMoreBtn();
    } catch {
      e => console.warn(e);
    }
  }

  showLoadMoreBtn() {
    this.refs.loadMoreBtn.removeAttribute('hidden');
  }

  hideLoadMoreBtn() {
    this.refs.loadMoreBtn.setAttribute('hidden', true);
  }

  clearViewer() {
    this.refs.viewer.innerHTML = '';
  }
}
