import FilmPresenter from './film';
import ProfilePresenter from './profile';
import {render} from '../utils/render';
import CanvasView from '../view/canvas';
import FilmSectionView from '../view/film-section';
import LoadingView from '../view/loading';
import NoFilmSectionView from '../view/no-film-section';
import {RenderPosition, SectionSettings, SortType} from '../const';
import {extendFilm} from '../utils/film';
import FilmListView from '../view/film-list';
import LoadMoreButtonView from '../view/load-more-button';
import {remove} from '../utils/render';
import {filter} from '../utils/filter';
import SortView from '../view/sort';
import {UpdateType} from '../const.js';

const FILMS_VISIBILITY_STEP = 5;
const SPECIAL_SECTION_SIZE = 2;

export default class Canvas {
  constructor(siteMainElement, siteHeaderElement, siteBodyElement, filmsModel, filterModel, commentsModel, api) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._siteMainElement = siteMainElement;
    this._siteHeaderElement = siteHeaderElement;
    this._siteBodyElement = siteBodyElement;
    this._renderedFilmCount = FILMS_VISIBILITY_STEP;
    this._filmPresenter = {};
    this._openedFilmPresenter = null;
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._profileComponent = new ProfilePresenter(siteHeaderElement, filmsModel);
    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._canvasComponent = new CanvasView();
    this._allFilmSectionComponent = new FilmSectionView(SectionSettings.ALL.TITLE);
    this._allFilmListComponent = new FilmListView();
    this._noFilmComponent = new NoFilmSectionView();
    this._loadingComponent = new LoadingView();

    this._topRatedSectionComponent = new FilmSectionView(SectionSettings.TOP_RATED.TITLE, SectionSettings.TOP_RATED.TYPE);
    this._topRatedFilmListComponent = new FilmListView();

    this._mostCommentedSectionComponent = new FilmSectionView(SectionSettings.MOST_COMMENTED.TITLE, SectionSettings.MOST_COMMENTED.TYPE);
    this._mostCommentedFilmListComponent = new FilmListView();

    this._noFilmSectionView = new NoFilmSectionView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._renderCanvas = this._renderCanvas.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderCanvas();
  }

  _getAllFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort((filmA, filmB) => filmB.premiere - filmA.premiere)
          .map((film) => extendFilm(film, SectionSettings.ALL.TITLE));
      case SortType.RATIO:
        return filteredFilms.sort((filmA, filmB) => filmB.ratio - filmA.ratio)
          .map((film) => extendFilm(film, SectionSettings.ALL.TITLE));
    }

    return filteredFilms.map((film) => extendFilm(film, SectionSettings.ALL.TITLE));
  }

  _getTopRatedFilms() {
    return this._getAllFilms().slice().sort((a, b) => b.ratio - a.ratio).slice(0, SPECIAL_SECTION_SIZE)
      .map((film) => extendFilm(film, SectionSettings.TOP_RATED.TITLE));
  }

  _getMostCommentedFilms() {
    return this._getAllFilms().slice().sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, SPECIAL_SECTION_SIZE).map((film) => extendFilm(film, SectionSettings.MOST_COMMENTED.TITLE));
  }

  _getComments() {
    return this._commentsModel.getComments();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    this._api.updateFilm(update).then((response) => {
      this._filmsModel.updateFilm(updateType, response);
    });
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._clearCanvas();
        this._renderCanvas();
        break;
      case UpdateType.MAJOR:
        this._clearCanvas(({resetRenderedFilmCount: true, resetSortType: true}));
        this._renderCanvas();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderCanvas();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearCanvas({resetRenderedFilmCount: true});
    this._renderCanvas();
  }

  _renderProfile() {
    render(this._siteHeaderElement, this._profileComponent);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._siteMainElement, this._sortComponent);
  }

  _renderNoFilmSection() {
    render(this._canvasComponent, this._noFilmComponent);
  }

  _renderLoading() {
    render(this._canvasComponent, this._loadingComponent);
  }

  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._siteBodyElement, this._handleViewAction, this._handleModeChange, this._commentsModel, this._api);
    filmPresenter.init(film);
    this._filmPresenter[film.componentId] = filmPresenter;
  }

  _renderFilmList(container, films) {
    films.forEach((film) => this._renderFilm(container, film));
  }

  _renderAllFilmSection() {
    render(this._allFilmSectionComponent, this._allFilmListComponent);
    this._renderFilmList(this._allFilmListComponent, this._getAllFilms().slice(0, this._renderedFilmCount));

    if (this._getAllFilms().length > this._renderedFilmCount) {
      this._renderLoadMoreButton();
    }

    render(this._canvasComponent, this._allFilmSectionComponent, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreButtonClick() {
    const newFilmCount = this._renderedFilmCount + FILMS_VISIBILITY_STEP;
    this._renderFilmList(this._allFilmListComponent, this._getAllFilms().slice(this._renderedFilmCount, newFilmCount));
    this._renderedFilmCount += FILMS_VISIBILITY_STEP;

    if (this._renderedFilmCount >= this._getAllFilms().length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setLoadMoreFilmHandler(this._handleLoadMoreButtonClick);

    render(this._allFilmSectionComponent, this._loadMoreButtonComponent);
  }

  _renderExtraSection(sectionComponent, filmListComponent, films) {
    render(sectionComponent, filmListComponent);
    this._renderFilmList(filmListComponent, films);
    render(this._canvasComponent, sectionComponent);
  }

  _clearCanvas({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getAllFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => {
        if (presenter.isOpen()) {
          this._openedFilmPresenter = presenter;
          return presenter.partialDestroy();
        }

        presenter.destroy();
      });

    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._noFilmComponent);
    remove(this._loadingComponent);
    remove(this._loadMoreButtonComponent);
    remove(this._topRatedSectionComponent);
    remove(this._mostCommentedSectionComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILMS_VISIBILITY_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  hide() {
    this._allFilmSectionComponent.hide();
    this._topRatedSectionComponent.hide();
    this._mostCommentedSectionComponent.hide();
    this._noFilmComponent.hide();
    this._sortComponent.hide();
  }

  show() {
    this._allFilmSectionComponent.show();
    this._topRatedSectionComponent.show();
    this._mostCommentedSectionComponent.show();
    this._noFilmComponent.show();
    this._sortComponent.show();
  }

  _resetOpenedFilmPresenter() {
    if (!this._openedFilmPresenter) {
      return;
    }

    if (!this._openedFilmPresenter.isOpen()) {
      return this._openedFilmPresenter = null;
    }

    const updatedFilm = this._filmsModel.getFilms().filter((film) => film.id === this._openedFilmPresenter._film.id)[0];
    this._openedFilmPresenter.init(updatedFilm);
  }

  _renderCanvas() {
    render(this._siteMainElement, this._canvasComponent);

    if (this._isLoading === true) {
      this._renderLoading();
      return;
    }

    this._renderSort(this._currentSortType);
    render(this._siteMainElement, this._canvasComponent);

    this._profileComponent.init();

    if (this._getAllFilms().length === 0 && this._isLoading === false) {
      return this._renderNoFilmSection();
    }

    this._resetOpenedFilmPresenter();
    this._renderAllFilmSection();

    if (this._getTopRatedFilms()[0].ratio) {
      this._renderExtraSection(this._topRatedSectionComponent, this._topRatedFilmListComponent, this._getTopRatedFilms());
    }

    if (this._getMostCommentedFilms()[0].comments.length) {
      this._renderExtraSection(this._mostCommentedSectionComponent, this._mostCommentedFilmListComponent, this._getMostCommentedFilms());
    }
  }
}
