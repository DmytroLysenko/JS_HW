import InfScroll from './components/js/infiniteScroll';
import Btn from './components/js/loadMoreBtn';
import openLightbox from './components/js/lightbox';
import alert from './components/js/PNotify';
import refs from './components/js/refs';

import basicTemplate from './components/templates/basicTemplate.hbs';
import '../Pixabay/components/styles/PixabayStyles.css';

export default class Pixabay {
  constructor(selector) {
    this.selector = selector;
    this.init();
  }

  init() {
    refs.set = [{ container: document.querySelector(this.selector) }];

    refs.container.innerHTML = basicTemplate();

    refs.set = [
      { form: document.querySelector('#pixabayForm') },
      { viewer: document.querySelector('#pixabayViewer') },
      { loadMoreBtn: document.querySelector('#pixabayLoadMoreBtn') },
    ];

    refs.viewer.addEventListener('click', openLightbox);
    refs.loadMoreBtn.addEventListener('click', this.handleBtn);
    refs.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleBtn(e) {
    const el = e.target;
    Btn.handle();
  }

  handleSubmit(e) {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value;
    const isInfScroll = e.target.elements.infiniteScroll.checked;
    if (InfScroll.isRun) {
      InfScroll.stop();
    }
    requestAnimationFrame(() => {
      Btn.hide();
      this.clearViewer();
    });

    if (!searchQuery) {
      alert('Enter search query');
      return;
    }
    if (isInfScroll) {
      InfScroll.run(searchQuery);
    } else {
      Btn.reset(e);
      Btn.insertData(refs.viewer);
    }
  }

  clearViewer() {
    refs.viewer.innerHTML = '';
  }
}
