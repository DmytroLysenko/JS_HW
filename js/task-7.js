// Напиши скрипт, который реагирует на изменение значения
// input#font-size-control (событие input) и изменяет инлайн-стиль
// span#text обновляя свойство font-size. В результате при перетаскивании
// ползунка будет меняться размер текста.

const input = document.querySelector("input#font-size-control");
const output = document.querySelector("span#text");

input.addEventListener("change", changeOutputFontSize);

function changeOutputFontSize(event) {
  const value = event.currentTarget.value;
  output.setAttribute("style", `font-size:${1 + value / 100}em;`);
}
