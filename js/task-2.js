// Напиши функцию countProps(obj), считающую кол-во свойств в объекте. Функция возвращает число - количество свойств.

"use strict";

console.log("TASK - 2");

const countProps = function(obj) {
  return Object.entries(obj).length;
};

// const countProps = obj => Object.entries(obj).length;

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(countProps({})); // 0

console.log(countProps({ name: "Mango", age: 2 })); // 2

console.log(countProps({ mail: "poly@mail.com", isOnline: true, score: 500 })); // 3

console.log(
  countProps({
    mail: "poly@mail.com",
    isOnline: true,
    score: 700,
    isChecked: false
  })
); // 4
