// Напиши функцию findLongestWord(string), которая принимает параметром произвольную
// строку (в строке будут только слова и пробелы) и возвращает самое длинное слово в этой строке.
"use strict";

const findLongestWord = function(string) {
  string = string.split(" ");
  let LongestWord = string[0];
  for (let i = 1; i < string.length; i += 1) {
    LongestWord =
      LongestWord.length < string[i].length ? string[i] : LongestWord;

    // if (LongestWord.length < string[i].length) {
    //   LongestWord = string[i];
    // }
  }
  return LongestWord;
};

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(findLongestWord("The quick brown fox jumped over the lazy dog")); // 'jumped'

console.log(findLongestWord("Google do a roll")); // 'Google'

console.log(findLongestWord("May the force be with you")); // 'force'
