// Задание
{
  // Создай галерею с возможностью клика по ее элементам и просмотра
  // полноразмерного изображения в модальном окне. Превью результата посмотри по ссылке.
  //
  // Разбей задание на несколько подзадач:
  // Создание и рендер разметки по массиву данных и предоставленному шаблону.
  // Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
  // Открытие модального окна по клику на элементе галереи.
  // Подмена значения атрибута src элемента img.lightbox__image.
  // Закрытие модального окна по клику на кнопку button[data-action="close-modal"].
  // Очистка значения атрибута src элемента img.lightbox__image.
  // Это необходимо для того, чтобы при следующем открытии модального окна,
  // пока грузится изображение, мы не видели предыдущее.
  //
  // Стартовые файлы
  // В папке src ты найдешь стартовые файлы проекта с базовой разметкой и готовыми стилями.
  // В файле gallery-items.js есть массив объектов содержащих информацию
  // о изображениях: маленькое изображение, оригинальное и описание.
  //
  // Разметка элемента галереи
  // Ссылка на оригинальное изображение должна храниться в data-атрибуте source
  // на элементе img, и указываться в href ссылки (это необходимо для доступности).
  // <li class="gallery__item">
  //   <a
  //     class="gallery__link"
  //     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  //   >
  //     <img
  //       class="gallery__image"
  //       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
  //       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  //       alt="Tulips"
  //     />
  //   </a>
  // </li>
  //
  // Дополнительно
  // Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями:
  // Закрытие модального окна по клику на div.lightbox__overlay.
  // Закрытие модального окна по нажатию клавиши ESC.
  // Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
}

import gallery from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  lightbox_btn: document.querySelector('button[data-action="close-lightbox"]'),
  lightbox_img: document.querySelector(".lightbox__image"),
};

buildGallery(refs.gallery, gallery);

refs.gallery.addEventListener("click", handleClick);

function handleClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  const img = e.target;
  openLightbox(img);
}

function handleKeybord(e) {
  const key = e.keyCode;
  console.log(e);
  if (key === 27) {
    closeLightbox(e);
    return;
  }
  if (key === 37 || key === 39) {
    changeLightboxImg(key);
  }

  function changeLightboxImg(key) {
    const direction = key === 37 ? "left" : "right";
    let currentNumb;
    const currentImg = Array.from(refs.gallery.querySelectorAll("img")).find(
      (img, idx) => {
        if (img.dataset.source === refs.lightbox_img.getAttribute("src")) {
          currentNumb = idx;
          return img;
        }
      }
    );
    const galleryItems = Array.from(
      refs.gallery.querySelectorAll(".gallery__item")
    );

    const nextImg = galleryItems[
      nextItem(galleryItems.length, currentNumb, direction)
    ].querySelector(".gallery__image");

    const imgURL = nextImg.dataset.source;
    const imgAlt = nextImg.getAttribute("alt");

    refs.lightbox_img.setAttribute("src", imgURL);
    refs.lightbox_img.setAttribute("alt", imgAlt);

    function nextItem(length, current, direction) {
      let next;
      if (direction === "left") {
        next = current === 0 ? length - 1 : current - 1;
      }
      if (direction === "right") {
        next = current === length - 1 ? 0 : current + 1;
      }
      return next;
    }
  }
}

function openLightbox(img) {
  refs.lightbox.classList.add("is-open");
  refs.lightbox_img.setAttribute("src", img.dataset.source);
  refs.lightbox_img.setAttribute("alt", img.alt);

  refs.lightbox.addEventListener("click", closeLightbox);
  window.addEventListener("keyup", handleKeybord);
}

function closeLightbox(e) {
  if (e.target.nodeName === "IMG") {
    return;
  }
  // Remove Listeners
  refs.lightbox.removeEventListener("click", closeLightbox);
  refs.lightbox.removeEventListener("keydown", handleKeybord);
  // Close Modal
  refs.lightbox.classList.remove("is-open");
  // Clear Lightbox`s img attributes
  refs.lightbox_img.setAttribute("src", "");
  refs.lightbox_img.setAttribute("alt", "");
}

function buildGallery(target, gallery) {
  const galleryMarkup = gallery.reduce((total, item) => {
    total += buildGalleryItem(item);
    return total;
  }, "");

  target.insertAdjacentHTML("beforeend", galleryMarkup);
}

function buildGalleryItem({ preview, original, description }) {
  return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>    
    `;
}
