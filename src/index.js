import './sass/main.scss';
import images from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalContent = document.querySelector('.lightbox__content');
const modalImage = document.querySelector('.lightbox__image');
const modalBtn = document.querySelector('.lightbox__button');

galleryContainer.addEventListener('click', openModal);
modalBtn.addEventListener('click', closeModal);
galleryContainer.insertAdjacentHTML('beforeend', createGalleryMarkup(images));

function createGalleryMarkup(images) {
  return images
    .map(({ original, preview, description }) => {
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
    })
    .join('');
}

function openModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  document.addEventListener('keydown', closeModal);

  modal.classList.add('is-open');
  modalImage.src = event.target.dataset.source;
  modalImage.alt = event.target.alt;
}

function closeModal(event) {
  event.preventDefault();
  document.removeEventListener('keydown', closeModal);
  modal.classList.remove('is-open');
  modalImage.src = '';
}
