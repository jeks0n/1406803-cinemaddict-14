import {createElement} from '../utils';

const SHORT_DESCRIPTION_LENGTH = 139;

const getShortDescription = (text) => {
  return `${text.slice(0, SHORT_DESCRIPTION_LENGTH) + '…'}`;
};

const createFilmCardTemplate = (film = {}) => {
  const {id, title, description, ratio, duration, poster, genres, premiere, comments} = film;
  const shortDescription = getShortDescription(description);
  const [firstGenre] = genres;
  const filmYear = premiere.getFullYear();
  const commentsLength = comments.length;

  return `<article id=${id} class="film-card">
     <h3 class="film-card__title">${title}</h3>
       <p class="film-card__rating">${ratio}</p>
       <p class="film-card__info">
         <span class="film-card__year">${filmYear}</span>
         <span class="film-card__duration">${duration}</span>
         <span class="film-card__genre">${firstGenre}</span>
       </p>
       <img src="${poster}" alt="" class="film-card__poster">
       <p class="film-card__description">${shortDescription}</p>
       <a class="film-card__comments">${commentsLength} comments</a>
       <div class="film-card__controls">
         <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
         <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
         <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
       </div>
   </article>`;
};

export default class Film {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
