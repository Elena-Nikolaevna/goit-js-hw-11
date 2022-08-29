export default function createMarkup(images) {
    return images
      .map(image => {
        return `
          <div class="gallery__item">
            <a class="gallery__link" href="${image.largeImageURL}">
                <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            </a>
            <div class="gallery__info">
                <p class="gallery__info-item">
                    <b>Likes ${image.likes}</b>
                </p>
                <p class="gallery__info-item">
                    <b>Views ${image.views}</b>
                </p>
                <p class="gallery__info-item">
                    <b>Comments ${image.comments}</b>
                </p>
                <p class="gallery__info-item">
                    <b>Downloads ${image.downloads}</b>
                </p>
            </div>
        </div>`;
      })
      .join('');
  }