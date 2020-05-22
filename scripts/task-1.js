// Задание 1

// Напиши функцию `delay(ms)`, которая возвращает промис, переходящий в состояние
// `"resolved"` через `ms` миллисекунд. Значением исполнившегося промиса должно
// быть то кол-во миллисекунд, которое передали во время вызова функции `delay`.

const logger = time => console.log(`Resolved after ${time}ms`);

const delay = ms => {
  return new Promise(resolve => {
    const dataForLogger = () => resolve(`${ms}`);
    setTimeout(dataForLogger, ms);
  });
};

// Вызовы функции для проверки
delay(2000).then(logger); // Resolved after 2000ms
delay(1000).then(logger); // Resolved after 1000ms
delay(1500).then(logger); // Resolved after 1500ms


// Вариант с реальным подсчетом времени

// const logger = timeStart => {
//     const timeEnd = Date.now();
//     const time = timeEnd - timeStart;
//     console.log(`Resolved after ${time}ms`);
//   };
  
  
//   const delay = ms => {
//     const timeStart = Date.now();
//     return new Promise((resolve, reject) => {
//       const dataForLogger = () => {
//         resolve(`${timeStart}`);
//         reject('Error');
//       };
//       setTimeout(dataForLogger, ms);
//     });
//   };
  
//   // Вызовы функции для проверки
//   delay(2000).then(logger); // Resolved after 2000ms
//   delay(1000).then(logger); // Resolved after 1000ms
//   delay(1500).then(logger); // Resolved after 1500ms
  