export default {
  _scrollPosition: 0,
  
  set scrollPosition(value) {
    this._scrollPosition = value;
  },

  get scrollPosition() {
    return this._scrollPosition;
  },

  showLoadMoreBtn() {
    this.refs.loadMoreBtn.removeAttribute('hidden');
  },

  hideLoadMoreBtn() {
    this.refs.loadMoreBtn.setAttribute('hidden', true);
  },
};
