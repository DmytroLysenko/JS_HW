import options from './fetchOptions';
const { BASE_URL, KEY, PER_PAGE } = options;

export default {
  page: 1,
  searchQuery: '',
  Data() {
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
