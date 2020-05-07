function loadLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value;
  } catch (err) {
    console.log('ERR get LocalStorage!', err);
    return undefined;
  }
}

function saveLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return;
  } catch (err) {
    console.log('ERR set LocalStorage!', err);
    return undefined;
  }
}

module.exports = { loadLocalStorage, saveLocalStorage };
