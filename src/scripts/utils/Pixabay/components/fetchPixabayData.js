const KEY = '16887620-e991db8737f2bb3a88bca8c81';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

export default {
  page: 1,
  searchQuery: '',
  fetchData() {
    return fetch(this.urlString)
      .then(j => j.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  },

  get urlString() {
    return `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&per_page=${PER_PAGE}&page=${this.page}`;
  },

  set searchQueryString(string) {
    this.searchQuery = string.split(' ').join('+');
  },

  get searchQueryString() {
    return this.searchQuery;
  },

  resetPage() {
    this.page = 1;
  },
};
