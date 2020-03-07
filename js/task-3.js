// Напиши функцию findBestEmployee(employees), которая принимает объект сотрудников
//  и возвращает имя самого продуктивного (который выполнил больше всех задач).
// Сотрудники и кол-во выполненых задач содержатся как свойства объекта в формате "имя":"кол-во задач".

"use strict";

console.log("TASK - 3");

// const findBestEmployee = function(employees) {
//   let countEmployees = 0;
//   let bestEmploye;
//   for (const key in employees) {
//     if (countEmployees === 0) {
//       bestEmploye = key;
//       countEmployees += 1;
//     } else {
//       bestEmploye = employees[key] > employees[bestEmploye] ? key : bestEmploye;
//       countEmployees += 1;
//     }
//   }
//   return bestEmploye;
// };

const findBestEmployee = function(employees) {
  const emplArray = Object.entries(employees);
  let bestEmploye = emplArray[0][0];
  for (const item of emplArray) {
    bestEmploye = item[1] > employees[bestEmploye] ? item[0] : bestEmploye;
  }
  return bestEmploye;
};

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(
  findBestEmployee({
    ann: 29,
    david: 35,
    helen: 1,
    lorence: 99
  })
); // lorence

console.log(
  findBestEmployee({
    poly: 12,
    mango: 17,
    ajax: 4
  })
); // mango

console.log(
  findBestEmployee({
    lux: 147,
    david: 21,
    kiwi: 19,
    chelsy: 38
  })
); // lux
