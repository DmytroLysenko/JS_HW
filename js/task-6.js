// Напиши скрипт, который бы при потере фокуса на инпуте,
// проверял его содержимое на правильное количество символов.

// Сколько символов должно быть в инпуте, указывается в его атрибуте data-length.
// Если введено подходящее количество, то border инпута становится зеленым, если неправильное - красным.
// Для добавления стилей, используй CSS-классы valid и invalid.

const inputValidation = document.querySelector("input#validation-input");

inputValidation.addEventListener("blur", checkInput);

function checkInput() {
  return inputValidation.value.length == Number(inputValidation.dataset.length)
    ? inputValidation.classList.add("valid")
    : inputValidation.classList.add("invalid");
}
