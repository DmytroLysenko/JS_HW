// Напиши скрипт который, при наборе текста в инпуте input#name-input (событие input),
// подставляет его текущее значение в span#name-output. Если инпут пустой,
// в спане должна отображаться строка 'незнакомец'.

const input = document.querySelector("input#name-input");
const output = document.querySelector("span#name-output");

input.addEventListener("input", handleOutput);

function handleOutput() {
  output.textContent = input.value;
  if (output.textContent.length === 0) {
    output.textContent = "незнакомец";
  }
}
