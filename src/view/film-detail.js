import SmartView from './smart.js';
import CommentView from './comment';
import {getHumanDate, getCheckedAttribute} from '../utils/common';

const getFilmComments = (filmCommentsIds, allComments) => {
  return allComments.slice().filter(({id}) => filmCommentsIds.includes(id));
};

const getListCommaSeparatedTemplate = (list) => {
  return `${list.join(', ')}`;
};

const getGenresTemplate = (genres) => {
  return `${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('')}`;
};

const createFilmDetailTemplate = (data, allComments) => {
  const {
    title,
    originalTitle,
    ageRating,
    director,
    writers,
    actors,
    country,
    description,
    ratio,
    duration,
    poster,
    genres,
    premiere,
    comments,
    userDetails,
    localCommentEmotion,
    localComment,
  } = data;
  const writersTemplate = getListCommaSeparatedTemplate(writers);
  const actorsTemplate = getListCommaSeparatedTemplate(actors);
  const genresTemplate = getGenresTemplate(genres);
  const humanPremiereDate = getHumanDate(premiere);
  const filmComments = getFilmComments(comments, allComments);
  const commentsLength = comments.length;
  const commentsTemplate = filmComments.map((film) => new CommentView(film).getTemplate()).join('');
  const favoriteAttribute = getCheckedAttribute(userDetails.isFavorite);
  const alreadyWatchedAttribute = getCheckedAttribute(userDetails.isAlreadyWatched);
  const watchListAttribute = getCheckedAttribute(userDetails.isWatchList);
  const localCommentEmotionTemplate = localCommentEmotion ?
    `<img src="images/emoji/${localCommentEmotion}.png" width="55" height="55" alt="emoji-${localCommentEmotion}">`
    : '';
  const localCommentText = localComment ? localComment : '';

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${ratio}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writersTemplate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actorsTemplate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanPremiereDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${genresTemplate}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" ${watchListAttribute} class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" ${alreadyWatchedAttribute} class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" ${favoriteAttribute} class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsLength}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsTemplate}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${localCommentEmotionTemplate}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${localCommentText}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmDetail extends SmartView {
  constructor(film, allComments) {
    super();
    this._data = FilmDetail.parseFilmToState(film);
    this._allComments = allComments;

    this._closeFilmPopupHandler = this._closeFilmPopupHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._localCommentEmotionHandler = this._localCommentEmotionHandler.bind(this);
    this._localCommentInputHandler = this._localCommentInputHandler.bind(this);

    this._localCommentTextElement = this.getElement().querySelector('.film-details__comment-input');
  }

  getTemplate() {
    return createFilmDetailTemplate(this._data, this._allComments);
  }

  _closeFilmPopupHandler(evt) {
    evt.preventDefault();
    this._callback.closePopupClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.detailFavoriteClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.detailWatchListClick();
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.detailAlreadyWatchedClick();
  }

  static parseFilmToState(film) {
    return {
      ...film,
      localComment: null,
      localCommentEmotion: null,
      scrollTop: null,
    };
  }

  static parseStateToFilm(data) {
    data = {
      ...data,
    };

    delete data.localComment;
    delete data.localCommentEmotion;
    delete data.scrollTop;

    return data;
  }

  _restorePosition() {
    this.getElement().scrollTop = this._data.scrollTop;
    this.getElement().querySelector('.film-details__comment-input').scrollTop = this._data.localCommentScrollTop;
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.setFavoriteClickHandler();
    this.setWatchListClickHandler();
    this.setAlreadyWatchedClickHandler();
    this.setClosePopupHandler();
    this.getElement().querySelector('.film-details__emoji-list')
      .querySelectorAll('input')
      .forEach((element) => element.addEventListener('click', this._localCommentEmotionHandler));
    this.getElement().querySelector('.film-details__comment-input')
      .addEventListener('input', this._localCommentInputHandler);
  }

  _localCommentEmotionHandler(evt) {
    evt.preventDefault();
    this.updateData({
      localCommentEmotion: evt.target.value,
      scrollTop: this.getElement().scrollTop,
    });
    this._restorePosition();
  }

  _localCommentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      localComment: evt.target.value,
      scrollTop: this.getElement().scrollTop,
      localCommentScrollTop: evt.target.scrollTop,
    }, true);
    this._restorePosition();
  }

  setClosePopupHandler(callback) {
    if (callback) {
      this._callback.closePopupClick = callback;
    }

    this.getElement().querySelector('.film-details__close-btn')
      .addEventListener('click', this._closeFilmPopupHandler);
  }

  setFavoriteClickHandler(callback) {
    if (callback) {
      this._callback.detailFavoriteClick = callback;
    }

    this.getElement().querySelector('.film-details__control-label--favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }

  setWatchListClickHandler(callback) {
    if (callback) {
      this._callback.detailWatchListClick = callback;
    }

    this.getElement().querySelector('.film-details__control-label--watchlist')
      .addEventListener('click', this._watchListClickHandler);
  }

  setAlreadyWatchedClickHandler(callback) {
    if (callback) {
      this._callback.detailAlreadyWatchedClick = callback;
    }

    this.getElement().querySelector('.film-details__control-label--watched')
      .addEventListener('click', this._alreadyWatchedClickHandler);
  }
}
