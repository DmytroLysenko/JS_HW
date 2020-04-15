// Напиши скрипт создания и очистки коллекции элементов.
// Пользователь вводит количество элементов в input и нажимает кнопку Создать,
// после чего рендерится коллекция. При нажатии на кнопку Очистить,
// коллекция элементов очищается.

// Создай функцию createBoxes(amount), которая принимает 1 параметр
// amount - число.
// Функция создает столько div, сколько указано в amount и добавляет
// их в div#boxes.

// Каждый созданный div:
// Имеет случайный rgb цвет фона
// Размеры самого первого div - 30px на 30px
// Каждый следующий div после первого, должен быть шире и выше
// предыдущего на 10px
// Создай функцию destroyBoxes(), которая очищает div#boxes.

// Изменено услови задачи!!!
// Первый div создается с размером, указанным в boxSize,
// все последующие УМЕНЬШАЮТСЯ до нуля с шагом "boxSize/amount"
// По начальному условию - каждый следующий div закрывает предыдущий.
// Причина - не нашел решения красивого отображения, а именно
// размещение дочернего элемента над родительским...

const boxSize = 300;

const container = document.getElementById("boxes");
const controls = document.getElementById("controls");
const input = document.querySelector('input[type="number"]');

const render = document.querySelector('button[data-action="render"]');
const destroy = document.querySelector('button[data-action="destroy"]');

container.setAttribute(
  "style",
  `width:${boxSize}px;height:${boxSize}px; margin:0 auto;`
);

controls.addEventListener("click", makeControl);

function makeControl(event) {
  const target = event.target;
  if (target === render) {
    const amount = Number(input.value);
    if (amount > 0) {
      createBoxes(amount, boxSize);
    } else {
      alert("Число должно быть больше 0");
    }
  }
  if (target === destroy) {
    destroyBoxes();
  }
}

function createBoxes(amount, boxSize) {
  destroyBoxes();
  const boxesFragment = document.createDocumentFragment();
  let currentParent = boxesFragment;
  const step = boxSize / amount;
  const randomColor = () => (Math.random() * 255).toFixed(0);
  const randomAngle = () => Math.random().toFixed(1);

  for (let i = 0; i < amount; i += 1) {
    const box = document.createElement("div");
    const bgc = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
    const size = boxSize - (i ? step * i : 0);
    box.setAttribute(
      "style",
      ` width:${size}px;
        height:${size}px;
        background-color:${bgc};
        display: flex;
        justify-content: center;
        align-items: center;
        transform: rotate(${randomAngle()}turn);`
    );
    currentParent.appendChild(box);
    currentParent = currentParent.childNodes[0];
  }
  container.appendChild(boxesFragment);
}

function destroyBoxes() {
  container.innerHTML = "";
  input.value = "";
}
