// Счетчик состоит из спана и кнопок, которые должны увеличивать и уменьшать значение счетчика на 1.

// Создай переменную counterValue в которой будет хранится текущее значение счетчика.
// Создай функции increment и decrement для увеличения и уменьшения значения счетчика
// Добавь слушатели кликов на кнопки, вызовы функций и обновление интерфейса

let counterValue = 0;

const counter = document.getElementById("counter");
const outlet = document.querySelector("span#value");
const decrement = document.querySelector('button[data-action="decrement"]');
const increment = document.querySelector('button[data-action="increment"]');

counter.addEventListener("click", makeChange);

function makeChange(event) {
  const target = event.target;
  if (target === increment) {
    makeIncrement();
  }
  if (target === decrement) {
    makeDecrement();
  }
}

function makeDecrement() {
  counterValue += -1;
  outlet.textContent = counterValue;
}
function makeIncrement() {
  counterValue += 1;
  outlet.textContent = counterValue;
}
