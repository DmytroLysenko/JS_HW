const basicLightbox = require('basiclightbox');
import modalTemplate from '../templates/modalTemplate.hbs';
import 'basiclightbox/dist/basiclightbox.min.css';

export default function open(e) {
  const nodeName = e.target.nodeName;
  if (nodeName !== 'IMG') {
    return;
  }
  const largeImgUrl = e.target.dataset.large;
  basicLightbox.create(modalTemplate({ largeImgUrl })).show();
}
