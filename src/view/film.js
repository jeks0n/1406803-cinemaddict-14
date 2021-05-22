import AbstractView from './abstract';
import {getHumanDuration} from '../utils/date';

const SHORT_DESCRIPTION_LENGTH = 140;
const SHORT_POSTFIX = '…';

const getShortDescription = (text) => {
  return text.length > SHORT_DESCRIPTION_LENGTH
    ? `${text.slice(0, SHORT_DESCRIPTION_LENGTH - SHORT_POSTFIX.length) + SHORT_POSTFIX}`
    : text;
};

const createFilmCardTemplate = (film = {}) => {
  const {title, description, ratio, duration, poster, genres, premiere, comments, userDetails} = film;
  const shortDescription = getShortDescription(description);
  const [firstGenre] = genres;
  const humanDuration = getHumanDuration(duration);
  const filmYear = premiere.getFullYear();
  const commentsLength = comments.length;

  const favoriteClassName = userDetails.isFavorite
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';

  const alreadyWatchedClassName = userDetails.isAlreadyWatched
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';

  const watchListClassName = userDetails.isWatchList
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';

  return `<article class="film-card">
     <h3 class="film-card__title">${title}</h3>
       <p class="film-card__rating">${ratio}</p>
       <p class="film-card__info">
         <span class="film-card__year">${filmYear}</span>
         <span class="film-card__duration">${humanDuration}</span>
         <span class="film-card__genre">${firstGenre}</span>
       </p>
       <img src="${poster}" alt="" class="film-card__poster">
       <p class="film-card__description">${shortDescription}</p>
       <a class="film-card__comments">${commentsLength} comments</a>
       <div class="film-card__controls">
         <button class="film-card__controls-item button ${watchListClassName}" type="button">Add to watchlist</button>
         <button class="film-card__controls-item button ${alreadyWatchedClassName}" type="button">Mark as watched</button>
         <button class="film-card__controls-item button ${favoriteClassName}" type="button">Mark as favorite</button>
       </div>
   </article>`;
};

export default class Film extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._openActiveElements = [
      '.film-card__title',
      '.film-card__poster',
      '.film-card__comments',
    ];

    this._openFilmPopupHandler = this._openFilmPopupHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _openFilmPopupHandler(evt) {
    evt.preventDefault();
    this._callback.openPopup();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  setOpenPopupHandler(callback) {
    this._callback.openPopup = callback;
    this._openActiveElements.forEach((className) => this.getElement().querySelector(className)
      .addEventListener('click', this._openFilmPopupHandler));
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._watchListClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._alreadyWatchedClickHandler);
  }
}
