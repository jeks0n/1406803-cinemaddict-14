import FilmPresenter from './film';
import {render} from '../utils/render';
import CanvasView from '../view/canvas';
import FilmSectionView from '../view/film-section';
import NoFilmSectionView from '../view/no-film-section';
import {SectionSettings} from '../const';
import {updateItem, getHashCode, getComponentId} from '../utils/common';
import FilmListView from '../view/film-list';
import LoadMoreButtonView from '../view/load-more-button';
import {remove} from '../utils/render';
import SortView from '../view/sort';

const FILMS_VISIBILITY_STEP = 5;
const SPECIAL_SECTION_SIZE = 2;

export default class Canvas {
  constructor(siteMainElement, siteBodyElement) {
    this._siteMainElement = siteMainElement;
    this._siteBodyElement = siteBodyElement;
    this._renderedFilmCount = FILMS_VISIBILITY_STEP;
    this._allFilmSectionTitleHash = getHashCode(SectionSettings.ALL.TITLE);
    this._topRatedFilmSectionTitleHash = getHashCode(SectionSettings.TOP_RATED.TITLE);
    this._mostCommentedFilmSectionTitleHash = getHashCode(SectionSettings.MOST_COMMENTED.TITLE);
    this._filmPresenter = {};

    this._canvasComponent = new CanvasView();

    this._allFilmSectionComponent = new FilmSectionView(SectionSettings.ALL.TITLE);
    this._allFilmListComponent = new FilmListView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();

    this._topRatedSectionComponent = new FilmSectionView(SectionSettings.TOP_RATED.TITLE, SectionSettings.TOP_RATED.TYPE);
    this._topRatedFilmListComponent = new FilmListView();

    this._mostCommentedSectionComponent = new FilmSectionView(SectionSettings.MOST_COMMENTED.TITLE, SectionSettings.MOST_COMMENTED.TYPE);
    this._mostCommentedFilmListComponent = new FilmListView();

    this._sortComponent = new SortView();
    this._noFilmSectionView = new NoFilmSectionView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(films, comments) {
    this._films = films.map((film) => ({
      ...film,
      componentId: getComponentId(this._allFilmSectionTitleHash, film.id),
    }));
    this._sourcedFilms = films.slice();
    this._topRatedFilms = this._films.slice().sort((a, b) => b.ratio - a.ratio).slice(0, SPECIAL_SECTION_SIZE)
      .map((film) => ({
        ...film,
        componentId: getComponentId(this._topRatedFilmSectionTitleHash, film.id),
      }));
    this._mostCommentedFilms = this._films.slice().sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, SPECIAL_SECTION_SIZE)
      .map((film) => ({
        ...film,
        componentId: getComponentId(this._mostCommentedFilmSectionTitleHash, film.id),
      }));

    this._comments = comments;

    this._renderSort();
    this._renderCanvas();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    Object
      .values(this._filmPresenter)
      .filter(({_film}) => _film.id === updatedFilm.id)
      .forEach((presenter) => presenter.init(updatedFilm, this._comments));
  }

  _renderSort() {
    render(this._siteMainElement, this._sortComponent);
  }

  _renderNoFilmSection() {
    render(this._canvasComponent, this._noFilmSectionView);
  }

  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._siteBodyElement, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film, this._comments);
    this._filmPresenter[film.componentId] = filmPresenter;
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._taskPresenter = {};
    this._renderedFilmCount = FILMS_VISIBILITY_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderFilmList(container, films) {
    films.forEach((film) => this._renderFilm(container, film));
  }

  _renderAllFilmSection() {
    render(this._allFilmSectionComponent, this._allFilmListComponent);
    this._renderFilmList(this._allFilmListComponent, this._films.slice(0, FILMS_VISIBILITY_STEP));

    if (this._films.length > FILMS_VISIBILITY_STEP) {
      this._renderLoadMoreButton();
    }

    render(this._canvasComponent, this._allFilmSectionComponent);
  }

  _handleLoadMoreButtonClick() {
    const newBeginPosition = this._renderedFilmCount - FILMS_VISIBILITY_STEP;
    this._renderFilmList(this._allFilmListComponent, this._films.slice(newBeginPosition, this._renderedFilmCount));
    this._renderedFilmCount += FILMS_VISIBILITY_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._allFilmSectionComponent, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setLoadMoreFilmHandler(this._handleLoadMoreButtonClick);
  }

  _renderExtraSection(sectionComponent, filmListComponent, films) {
    render(sectionComponent, filmListComponent);
    this._renderFilmList(filmListComponent, films);
    render(this._canvasComponent, sectionComponent);
  }

  _renderCanvas() {
    render(this._siteMainElement, this._canvasComponent);

    if (this._films.length === 0) {
      return this._renderNoFilmSection();
    }

    this._renderAllFilmSection();

    if (this._topRatedFilms[0].ratio) {
      this._renderExtraSection(this._topRatedSectionComponent, this._topRatedFilmListComponent, this._topRatedFilms);
    }

    if (this._mostCommentedFilms[0].comments.length) {
      this._renderExtraSection(this._mostCommentedSectionComponent, this._mostCommentedFilmListComponent, this._mostCommentedFilms);
    }
  }
}
