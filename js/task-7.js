// Напиши скрипт, который реагирует на изменение значения
// input#font-size-control (событие input) и изменяет инлайн-стиль
// span#text обновляя свойство font-size. В результате при перетаскивании
// ползунка будет меняться размер текста.

const input = document.querySelector("input#font-size-control");
const output = document.querySelector("span#text");

input.setAttribute("min", 5);
input.addEventListener("input", handleScrollbar);

output.style.fontSize = "2em";
// output.style.fontSize = "18px";

const starValue = Number(input.value);
const fontSize = output.style.fontSize
  ? parseFloat(convertToEm(output.style.fontSize))
  : 1;
const max = (fontSize * 100) / starValue;

function handleScrollbar(event) {
  const value = event.currentTarget.value;
  output.style.fontSize = `${(max * value) / 100}em`;
}

function convertToEm(str) {
  if (str.includes("px")) {
    const html = document.querySelector("html");
    return `${parseInt(str) / parseFloat(getComputedStyle(html).fontSize)}em`;
  }
  if (str.includes("em")) {
    return str;
  }
}
