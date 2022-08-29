import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import AxiosRequestService from './axios';
import createMarkup from './markupGallery';

const requireImages = new AxiosRequestService();
const gallery = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.style.display = 'none';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

refs.loadMoreBtn.style.display = 'none';

async function onSearch(evt) {
  evt.preventDefault();

  clearMarkup();

  const searchValue = evt.currentTarget.elements.searchQuery.value.trim();

  if (!searchValue) {
    return;
  }

  requireImages.query = searchValue;
  requireImages.resetPage();

  const images = await requireImages.getImage();

  if (images.hits.length === 0) {
    Notify.failure('Please, write the correct query');
    return;
  }

  totalHits = images.totalHits;

  const markup = createMarkup(images.hits);

  addToHTML(markup);

  toggleLoadMoreBtn(totalHits);

  gallery.refresh();
}

async function onLoadMore() {
  const images = await requireImages.getImage();

  const markup = createMarkup(images.hits);

  totalHits -= images.hits.length;

  addToHTML(markup);

  toggleLoadMoreBtn(totalHits);

  gallery.refresh();
}

function addToHTML(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function toggleLoadMoreBtn(hitsValue) {
  if (hitsValue === 0 || hitsValue < 0) {
    refs.loadMoreBtn.style.display = 'none';
  } else {
    refs.loadMoreBtn.style.display = 'block';
  }
}
