import {remove, render, replace} from '../utils/render';
import FilmView from '../view/film';
import FilmDetailView from '../view/film-detail';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class Film {
  constructor(filmListContainer, siteBodyElement, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._siteBodyElement = siteBodyElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._filmDetailComponent = null;
    this._mode = Mode.DEFAULT;

    this._openFilmPopup = this._openFilmPopup.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeFilmPopup = this._closeFilmPopup.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    const prevFilmComponent = this._filmComponent;
    const prevDetailComponent = this._filmDetailComponent;

    this._filmComponent = new FilmView(this._film);
    this._filmDetailComponent = new FilmDetailView(this._film, this._comments);

    this._filmComponent.setOpenPopupHandler(this._openFilmPopup);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmDetailComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmDetailComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmDetailComponent.setClosePopupHandler(this._closeFilmPopup);

    if (prevFilmComponent === null || prevDetailComponent === null) {
      return render(this._filmListContainer, this._filmComponent);
    }

    if (this._mode === Mode.OPENED) {
      this._filmDetailComponent.restoreHandlers();
    }

    replace(this._filmComponent, prevFilmComponent);
    replace(this._filmDetailComponent, prevDetailComponent);
    remove(prevFilmComponent);
    remove(prevDetailComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailComponent);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closeFilmPopup(evt);
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _closeFilmPopup() {
    remove(this._filmDetailComponent);
    this._siteBodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _openFilmPopup() {
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._filmDetailComponent.restoreHandlers();
    this._siteBodyElement.appendChild(this._filmDetailComponent.getElement());
    this._siteBodyElement.classList.add('hide-overflow');
    this._filmDetailComponent.setClosePopupHandler(this._closeFilmPopup);
    this._changeMode();
    this._mode = Mode.OPENED;
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmPopup();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      {
        ...this._film,
        userDetails: {
          ...this._film.userDetails,
          isFavorite: !this._film.userDetails.isFavorite,
        },
      },
    );
  }

  _handleWatchListClick() {
    this._changeData(
      {
        ...this._film,
        userDetails: {
          ...this._film.userDetails,
          isWatchList: !this._film.userDetails.isWatchList,
        },
      },
    );
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      {
        ...this._film,
        userDetails: {
          ...this._film.userDetails,
          isAlreadyWatched: !this._film.userDetails.isAlreadyWatched,
        },
      },
    );
  }
}
