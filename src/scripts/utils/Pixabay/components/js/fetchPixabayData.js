import fetchOption from './fetchOptions';

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
    return `${fetchOption.BASE_URL}?key=${fetchOption.KEY}&q=${this.searchQuery}&per_page=${fetchOption.PER_PAGE}&page=${this.page}`;
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
