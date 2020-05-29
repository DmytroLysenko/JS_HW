import '../styles/styles.css';
import { errorNotice, alertNotice } from './utils/pnotify';
import fetchCountries from './utils/fetch-countries';
const debounce = require('lodash.debounce');

import templateListCountries from '../templates/list-countries.hbs';
import templateCountryDetail from '../templates/countries-datail.hbs';

const refs = {
  input: document.querySelector('#search-input'),
  viewer: document.querySelector('#search-viewer'),
};

refs.input.addEventListener('input', debounce(handleInput, 700));

function handleInput(e) {
  const searchQuery = e.target.value;
  if (!searchQuery) {
    return;
  }
  fetchCountries(searchQuery)
    .then(data => {
      const countCountries = data.length;
      if (countCountries === 1) {
        viewDetailCountry(data[0], e);
      } else if (countCountries < 10) {
        viewListCountries(data);
      } else if (countCountries > 10) {
        showMessage(searchQuery);
      } else {
        errorNotice(
          `For query "${searchQuery}" no matches. Change your query.`,
        );
      }
    })
    .catch(error => {
      errorNotice(error);
    });
}

function viewDetailCountry({ name, population, languages, flag, capital }, e) {
  const countryInfo = {
    name,
    capital,
    population,
    languages,
    flag,
    countLanguages: languages.length,
  };
  e.target.value = '';
  const markup = templateCountryDetail(countryInfo);
  refs.viewer.innerHTML = markup;
}

function viewListCountries(arrCountries) {
  const countriesNames = arrCountries.map(country => country.name);
  const markup = templateListCountries(countriesNames);
  refs.viewer.innerHTML = markup;
}

function showMessage(searchQuery) {
  const message = `Too many matches found for "${searchQuery}". Please enter a more specific query.`;
  alertNotice(message);
}
