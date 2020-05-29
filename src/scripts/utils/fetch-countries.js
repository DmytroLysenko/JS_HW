const baseURL = 'https://restcountries.eu/rest/v2/name/';

export default function fetchCountries(search) {
  return fetch(baseURL + search).then(response => response.json());
}
