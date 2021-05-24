import {remove, render, replace} from '../utils/render';
import FilmView from '../view/film';
import FilmDetailView from '../view/film-detail';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class Film {
  constructor(filmListContainer, siteBodyElement, changeData, changeMode, commentsModel, api) {
    this._commentsModel = commentsModel;
    this._filmListContainer = filmListContainer;
    this._siteBodyElement = siteBodyElement;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._api = api;

    this._filmComponent = null;
    this._filmDetailComponent = null;
    this._mode = Mode.DEFAULT;

    this._openFilmPopup = this._openFilmPopup.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleAddCommentCommand = this._handleAddCommentCommand.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeFilmPopup = this._closeFilmPopup.bind(this);
  }

  init(film, updateType) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevDetailComponent = this._filmDetailComponent;

    if (!this.isOpen() || updateType === UpdateType.PATCH) {
      this._filmComponent = new FilmView(this._film);
      this._filmComponent.setOpenPopupHandler(this._openFilmPopup);
      this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
      this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
      this._filmComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    }

    this._filmDetailComponent = new FilmDetailView(this._film, []);
    this._setDetailComponent();


    if (prevFilmComponent === null && prevDetailComponent === null) {
      return render(this._filmListContainer, this._filmComponent);
    }

    if (this.isOpen()) {
      this._filmDetailComponent.restoreHandlers();
      this._fetchComments();
      replace(this._filmDetailComponent, prevDetailComponent);
      remove(prevDetailComponent);
    }

    if (prevFilmComponent !== null) {
      replace(this._filmComponent, prevFilmComponent);
      remove(prevFilmComponent);
    }
  }

  _setDetailComponent() {
    this._filmDetailComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmDetailComponent.setAlreadyWatchedClickHandler(this._handleAlreadyWatchedClick);
    this._filmDetailComponent.setCommentDeleteClickHandler(this._handleDeleteCommentClick);
    this._filmDetailComponent.setLocalCommentAddToFilmHandler(this._handleAddCommentCommand);
    this._filmDetailComponent.setClosePopupHandler(this._closeFilmPopup);
    this._filmDetailComponent.restoreHandlers();
  }

  _fetchComments() {
    this._api.getComments(this._film).then((comments) => {
      const prevDetailComponent = this._filmDetailComponent;
      this._commentsModel.setComments(comments);
      this._filmDetailComponent = new FilmDetailView(this._film, this._commentsModel.getComments());
      this._setDetailComponent();
      replace(this._filmDetailComponent, prevDetailComponent);
      remove(prevDetailComponent);
    });
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailComponent);
  }

  partialDestroy() {
    remove(this._filmComponent);
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
    this._fetchComments();
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmPopup();
    }
  }

  isOpen() {
    return this._mode === Mode.OPENED;
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
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
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
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
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {
        ...this._film,
        userDetails: {
          ...this._film.userDetails,
          isAlreadyWatched: !this._film.userDetails.isAlreadyWatched,
        },
      },
    );
  }

  _handleDeleteCommentClick(commentId) {
    this._api.deleteComment(commentId).then(() => {
      this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.MINOR,
        {
          ...this._film,
          comments: this._film.comments.filter((comment) => comment !== commentId ),
        },
      );

      this._commentsModel.deleteComment(UserAction.DELETE_COMMENT, commentId);
    }).catch(() => {
      this._filmDetailComponent.shake(this._filmDetailComponent.rollBackChanges);
    });
  }

  _handleAddCommentCommand(update) {
    this._api.addComment(this._film, update).then((result) => {
      this._commentsModel.addComment(UserAction.ADD_COMMENT, result.comments);
      this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.MINOR,
        result.film,
      );
    }).catch(() => {
      this._filmDetailComponent.shake(this._filmDetailComponent.rollBackChanges);
    });
  }
}
